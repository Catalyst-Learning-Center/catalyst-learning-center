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
        JOIN "users" ON "users"."id" = "user_info"."user_id" WHERE "users"."active" = true ORDER BY "user_first_name";`;
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

router.get('/subjects/:id', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('/tutors/subjects GET route hit with: ', req.params);
        const queryText = `SELECT "user_info_subjects"."id" AS "join_id", "subjects".* FROM "user_info_subjects"
        JOIN "subjects" ON "subjects"."id" = "user_info_subjects"."subjects_id"
        WHERE "user_info_id" = $1;`;
        pool.query(queryText, [req.params.id]).then((results) => {
            console.log('back from /tutors/subjects GET route with: ', results.rows);
            res.send(results.rows);
        }).catch((error) => {
            console.log('/tutors/subjects GET error: ', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(401);
    }
})

router.get('/locations/:id', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('/tutors/locations GET route hit with: ', req.params);
        const queryText = `SELECT "user_info_location"."id" AS "join_id", "location"."location_name", "location"."id" FROM "user_info_location"
        JOIN "location" ON "location"."id" = "user_info_location"."location_id"
        WHERE "user_info_id" = $1;`;
        pool.query(queryText, [req.params.id]).then((results) => {
            console.log('back from /tutors/locations GET route with: ', results.rows);
            res.send(results.rows);
        }).catch((error) => {
            console.log('/tutors/locations GET error: ', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(401);
    }
})

//  async await POST route to add a new tutor to the database and register them as a user
router.post('/', (req, res) => {
    console.log('in tutors router', req.body)
    const userLocations = req.body.newTutor.newTutorLocations
    const userSubects = req.body.newTutor.newTutorSubjects

    if (req.isAuthenticated()) {
        (async () => {
            const client = await pool.connect();

            try {
                await client.query('BEGIN');
                const newTutor = req.body.newTutor.newTutorToAdd;
                // BELOW HERE
                // define password via client
                const password = encryptLib.encryptPassword(newTutor.password);
                // INSERT INTO users... from req.body.newTutor
                let queryText = `INSERT INTO "users" (username, password) 
                                    VALUES ($1, $2) RETURNING id;`;
                const values = [newTutor.applicant_email, password];
                const userResult = await client.query(queryText, values);
                // id of the newly inserted tutor
                const userId = userResult.rows[0].id;

                // INSERT INTO ... user_info
                userQuery = `INSERT INTO "user_info" ("user_id", "user_first_name", "user_last_name", "user_address", "user_city", 
                "user_state", "user_zipcode", "user_cell_phone", "user_email", "user_qualifications", "user_experience", 
                "user_age_group", "resume", "password") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING "id";`
                const userInfoResult = await client.query(userQuery, [userId, newTutor.applicant_first_name, newTutor.applicant_last_name, newTutor.applicant_address,
                    newTutor.applicant_city, newTutor.applicant_state, newTutor.applicant_zipcode, newTutor.applicant_cell_phone, newTutor.applicant_email,
                    newTutor.applicant_qualifications, newTutor.applicant_experience, newTutor.applicant_age_group, 
                    newTutor.resume, newTutor.password])
                    const userInfoId = userInfoResult.rows[0].id;

                // INSERT INTO ... user_info_location 
                // const req.body.locations declared 
                for (let location of userLocations) {
                let locationQuery = 'INSERT INTO "user_info_location" ("user_info_id", "location_id") VALUES ($1, $2);';
                await client.query(locationQuery, [userInfoId, location])
                }

                // INSERT INTO ... user_info_subjects 
                for (let subject of userSubects) {
                   let subjectsQuery = `INSERT INTO "user_info_subjects" ("user_info_id", "subjects_id") VALUES ($1, $2);`;
                    await client.query(subjectsQuery, [userInfoId, subject])
                }
                const acceptApplicationQuery = `UPDATE "applications" SET "active" = false WHERE id = $1;`;
                await client.query(acceptApplicationQuery, [newTutor.id])
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

router.put('/edit/subjects', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('/tutors/edit/subjects PUT route hit with: ', req.body);
        const queryText = `DELETE FROM "user_info_subjects" WHERE "user_info_id" = $1;`;
        pool.query(queryText, [req.body.id]).then((results) => {
            for (let subject of req.body.subjects) {
                let queryText = `INSERT INTO "user_info_subjects" ("user_info_id", "subjects_id")
                VALUES ($1, $2);`;
                pool.query(queryText, [req.body.id, subject]).then((results) => {
                    res.sendStatus(201);
                }).catch((error) => {
                    console.log('/tutors/edit PUT error: ', error);
                    res.sendStatus(500);
                })
            }
        }).catch((error) => {
            console.log('/tutors/edit PUT error: ', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(401);
    }
})

router.put('/edit/locations', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('/tutors/edit/locations PUT route hit with: ', req.body);
        const queryText = `DELETE FROM "user_info_location" WHERE "user_info_id" = $1;`;
        pool.query(queryText, [req.body.id]).then((results) => {
            for (let location of req.body.locations) {
                let queryText = `INSERT INTO "user_info_location" ("user_info_id", "location_id")
                VALUES ($1, $2);`;
                pool.query(queryText, [req.body.id, location]).then((results) => {
                    res.sendStatus(201);
                }).catch((error) => {
                    console.log('/tutors/edit PUT error: ', error);
                    res.sendStatus(500);
                })
            }
        }).catch((error) => {
            console.log('/tutors/edit PUT error: ', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(401);
    }
})

module.exports = router;