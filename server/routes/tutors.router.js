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

module.exports = router;