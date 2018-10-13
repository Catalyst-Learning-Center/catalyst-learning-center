const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

/**
 * GET route template
 */
router.get('/', (req, res) => {

    if (req.isAuthenticated()) {
        const query = `SELECT * FROM "applications" WHERE "active" = true ORDER BY "date" DESC;`;
        pool.query(query).then((results)=> {
            res.send(results.rows);
        }).catch((error) => {
            res.sendStatus(500);
        });
    }else {
        res.sendStatus(403);
    }


}); // end applications GET route

/**
 * "Delete" (Update) an application from the database
 */
router.put('/:id', (req, res) => {
    if (req.isAuthenticated()){
        console.log(req.params.id)
        const query =  `UPDATE "applications" SET "active" = false WHERE "id" = $1;`;
        pool.query(query, [req.params.id]).then((results) => {
            res.sendStatus(201);
        }).catch((error)=> {
            res.sendStatus(500);
        })
    }else {
        res.sendStatus(403);
    }
}); // end delete

/**
 * POST route template
 */
router.post('/', (req, res) => {
    if (req.body.captcha === undefined || req.body.captcha === '' || req.body.captcha === null) {
        return res.json({ "success": false, "msg": "Please fill out captcha" });
    }

    const application = req.body.application;
    const applicantSubjects = req.body.applicant_subjects
    const applicantLocations = req.body.applicant_locations

    // Secret Key
    const secretKey = '6Ld9BHQUAAAAADgfahozNvUGW9a0Cohaz7RkAdHI';

    //verify URL
    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

    // make request to verifyUrl
    axios({
        method: 'POST',
        url: verifyUrl,
    }).then((response) => {
        body = response.data;
        // if not successful
        if (body.success !== undefined && !body.success) {
            return res.json({ "success": false, "msg": "Failed captcha verification" });
        }
        //if successful


        (async () => {
            const client = await pool.connect();

            try {
                await client.query('BEGIN');
                let queryText = `INSERT INTO "applications" 
                    ("applicant_first_name", "applicant_last_name", "applicant_address", "applicant_city", "applicant_state", "applicant_zipcode", "applicant_cell_phone", "applicant_email", "applicant_qualifications", "applicant_experience", "applicant_age_group", "resume")
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) =
                    RETURNING "id";`;
                const values = [application.applicant_first_name, application.applicant_last_name, application.applicant_address, application.applicant_city, application.applicant_state, application.applicant_zipcode, application.applicant_cell_phone, application.applicant_email, application.applicant_qualifications, application.applicant_experience, application.applicant_age_group, application.resume];
                const applicationResult = await client.query(queryText, values);

                // id of the newly inserted application
                const applicationId = applicationResult.rows[0].id;

                for (let subject of applicantSubjects) {
                    queryText = 'INSERT INTO "applications_subjects" ("applications_id", "subjects_id") VALUES ($1, $2);';
                    const result = await client.query(queryText, [applicationId, subject.id]);
                }

                for (let location of applicantLocations) {
                    queryText = 'INSERT INTO "applications_location" ("applications_id", "locations_id") VALUES ($1, $2);';
                    const result = await client.query(queryText, [applicationId, location.id]);
                }
                await client.query('COMMIT');
                res.sendStatus(201);
            } catch (e) {
                console.log('ROLLBACK', e);
                await client.query('ROLLBACK');
                throw e;
            } finally {
                client.release();
            }

            // return res.json({ "success": true, "msg": "Captcha passed" });
        })().catch((error) => {
            console.log('CATCH', error);
            res.sendStatus(500);
        });



    }).catch((error) => {
        console.log('ERROR', error);
        res.sendStatus(500);
    })
}); // end POST

module.exports = router;