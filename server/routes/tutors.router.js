const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

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
console.log('in tutors router')
if (req.isAuthenticated()) {
    
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