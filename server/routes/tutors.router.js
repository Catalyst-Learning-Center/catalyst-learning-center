const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const encryptLib = require('../modules/encryption');

/**
 * GET route template
 */
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('/tutors GET route hit');
        const queryText = `SELECT "user_info".*, "users"."permissions" FROM "user_info"
        JOIN "users" ON "users"."id" = "user_info"."user_id" WHERE "users"."active" = true ORDER BY "id";`;
        pool.query(queryText).then((results) => {
            console.log('back form /tutors GET route with: ', results.rows);
            res.send(results.rows);
        }).catch((error) => {
            console.log('/tutors GET error: ', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(401);
    }
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    console.log('in tutors router', req.body)
    if (req.isAuthenticated()) {
        (async () => {
            const client = await pool.connect();
    
            try {
                await client.query('BEGIN');

                // BELOW HERE
                const password = encryptLib.encryptPassword(req.body.newTutor.password);
                // INSERT INTO users... from req.body.newTutor
                const queryText = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id';
              
                const values = [contact.city, contact.state, contact.zip, contact.street];
                const addressResult = await client.query(queryText, values);
                // id of the newly inserted tutor
                const addressId = addressResult.rows[0].id;

                // INSERT INTO ... user_info

                // INSERT INTO ... user_info_location (in a for loop)
                // for each location {
                queryText = 'INSERT INTO "people" ("first_name", "address_id") VALUES ($1, $2) RETURNING "id";';
                await client.query(queryText, [contact.first_name, addressId]);
                // }

                // INSERT INTO ... user_info_subjects


                // ABOVE HERE
                
                await client.query('COMMIT');
                res.sendStatus(201);
            } catch (e) {
                console.log('ROLLBACK', e);
                await client.query('ROLLBACK');
                throw e;
            } finally {
                client.release();
            }
        })().catch( (error) => {
            console.log('CATCH', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(401);
    }
});

/**
 * PUT route template
 */
router.put('/admin', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('/tutors/admin PUT route hit with: ', req.body);
        let permissions;
        if (req.body.permissions === 1) {
            permissions = 2;
        } else if (req.body.permissions === 2) {
            permissions = 1;
        }
        const queryText = `UPDATE "users" SET "permissions" = $1 WHERE "id" = $2;`;
        pool.query(queryText, [permissions, req.body.id]).then((results) => {
            console.log('back from /tutors/admin PUT with: ', results.rows);
            res.sendStatus(201);
        }).catch((error) => {
            console.log('/tutors/admin PUT error: ', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(401);
    }
})

router.put('/delete', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('/tutors/delete PUT route hit with: ', req.body);
        const queryText = `UPDATE "users" SET "active" = false WHERE "id" = $1;`;
        pool.query(queryText, [req.body.id]).then((results) => {
            console.log('back from /tutors/delete PUT with: ', results.rows);
            res.sendStatus(201);
        }).catch((error) => {
            console.log('/tutors/delete PUT error: ', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(401);
    }
})

router.put('/edit', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('/tutors/edit PUT route hit with: ', req.body);
        let edit = req.body;
        const queryText = `UPDATE "user_info" SET "user_first_name" = $1, "user_last_name" = $2,
        "user_address" = $3, "user_city" = $4, "user_state" = $5, "user_zipcode" = $6, "user_cell_phone" = $7,
        "user_email" = $8, "user_qualifications" = $9, "user_experience" = $10, "user_age_group" = $11
        WHERE "id" = $12;`;
        pool.query(queryText, [edit.user_first_name, edit.user_last_name, edit.user_address, edit.user_city,
        edit.user_state, edit.user_zipcode, edit.user_cell_phone, edit.user_email, edit.user_qualifications,
        edit.user_experience, edit.user_age_group, edit.id]).then((results) => {
            console.log('back from /tutors/edit PUT with: ', results.rows);
            res.sendStatus(201);
        }).catch((error) => {
            console.log('/tutors/edit PUT error: ', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(401);
    }
})

module.exports = router;