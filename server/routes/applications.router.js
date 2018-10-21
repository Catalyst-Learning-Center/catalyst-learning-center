const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

const nodemailer = require("nodemailer");


// GET route for Manage Applications View
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        const query = `SELECT * FROM "applications" WHERE "active" = true ORDER BY "date" DESC;`;
        pool.query(query).then((results)=> {
            res.send(results.rows);
        }).catch((error) => {
            console.log('get applications error: ', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
}); // end applications GET route


// GET route for Pending Applications Nav Indicator
router.get('/pending', (req, res) => {
    if (req.isAuthenticated()) {
        const query = `SELECT COUNT(*) FROM "applications" WHERE "active" = true;`;
        pool.query(query).then((results)=> {
            res.send(results.rows);
        }).catch((error) => {
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
}); // end pending applications GET route

// get locations for each applicant/application
router.get('/locations/:id', (req, res) => {
    if (req.isAuthenticated()) {
        const query = 
        `SELECT "location"."id", "location"."location_name"
        FROM "applications_location"
        JOIN "location" ON "applications_location"."location_id" = "location"."id"
        WHERE "applications_location"."applications_id" = $1;`;
        pool.query(query, [req.params.id]).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            console.log(error)
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
}); // end applications-locations GET route

// get subjects for each applicant/application
router.get('/subjects/:id', (req, res) => {
    if (req.isAuthenticated()) {
        const query = 
        `SELECT "subjects"."id", "subjects"."subjects"
        FROM "applications_subjects"
        JOIN "subjects" ON "applications_subjects"."subjects_id" = "subjects"."id"
        WHERE "applications_subjects"."applications_id" = $1;`;
        pool.query(query, [req.params.id]).then((results)=> {
            console.log('back from /applications/subjects/', req.params.id, ' with: ', results.rows);
            res.send(results.rows);
        }).catch((error) => {
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
}); // end applications-subjects GET route


 // "Delete" (Update) an application from the database
router.put('/:id', (req, res) => {
    if (req.isAuthenticated()) {
        console.log(req.params.id)
        const query = `UPDATE "applications" SET "active" = false WHERE "id" = $1;`;
        pool.query(query, [req.params.id]).then((results) => {
            res.sendStatus(201);
        }).catch((error) => {
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
}); // end delete

/**
 * POST route template
 */
router.post('/', (req, res) => {
    console.log('in application post', req.body.captcha);
    
    if (req.body.captcha === undefined || req.body.captcha === '' || req.body.captcha === null) {
        return res.sendStatus(500);
    }

    const application = req.body.application;
    const applicantSubjects = req.body.applicant_subjects
    const applicantLocations = req.body.applicant_locations

    //verify URL
    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_API_SECRET_KEY}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

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
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                    RETURNING "id";`;
                const values = [application.applicant_first_name, application.applicant_last_name, application.applicant_address, application.applicant_city, application.applicant_state, application.applicant_zipcode, application.applicant_cell_phone, application.applicant_email, application.applicant_qualifications, application.applicant_experience, application.applicant_age_group, application.resume];
                const applicationResult = await client.query(queryText, values);

                // id of the newly inserted application
                const applicationId = applicationResult.rows[0].id;

                for (let subject of applicantSubjects) {
                    queryText = 'INSERT INTO "applications_subjects" ("applications_id", "subjects_id") VALUES ($1, $2);';
                    const result = await client.query(queryText, [applicationId, subject]);
                }

                for (let location of applicantLocations) {
                    queryText = 'INSERT INTO "applications_location" ("applications_id", "location_id") VALUES ($1, $2);';
                    const result = await client.query(queryText, [applicationId, location]);
                }
                await client.query('COMMIT');
                
                const auth = {
                    type: 'OAuth2',
                    user: 'catalystcenter.mail@gmail.com',
                    clientId: process.env.OAUTH_CLIENT_ID,
                    clientSecret: process.env.OAUTH_CLIENT_SECRET,
                    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
                };

                const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: auth
                });

                const mail = {
                    from: "Catalyst Learning Center <catalystcenter.mail@gmail.com>",
                    to: "catalystcenter.mail@gmail.com",
                    subject: "Application Submitted",
                    text: "An application has been submitted to Catalyst Learning Center",
                    html: "<p>An application has been submitted to Catalyst Learning Center</p>"
                }

                transporter.sendMail(mail, function (err, info) {
                    if (err) {
                        console.log(err);
                    } else {
                        // see https://nodemailer.com/usage
                        console.log("info.messageId: " + info.messageId);
                        console.log("info.envelope: " + info.envelope);
                        console.log("info.accepted: " + info.accepted);
                        console.log("info.rejected: " + info.rejected);
                        console.log("info.pending: " + info.pending);
                        console.log("info.response: " + info.response);
                    }
                    transporter.close();
                });
                res.sendStatus(201);
            } catch (e) {
                console.log('ROLLBACK', e);
                await client.query('ROLLBACK');
                throw e;
            } finally {
                client.release();
            }
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