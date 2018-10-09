const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/active', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('/sessions/active GET hit');
        const queryText = `SELECT "sessions"."student_name", "sessions"."start_time", "schools"."school_name", "grade"."grade_level"
        FROM "sessions" JOIN "schools" ON "schools"."id" = "sessions"."school_id"
        JOIN "grade" ON "grade"."id" = "sessions"."grade_id"
        WHERE "user_id" = $1 AND "end_time" is NULL;`;
        pool.query(queryText, [req.user.id]).then((results) => {
            console.log('back from /sessions/active GET with: ', results.rows);
            res.send(results.rows);
        }).catch((error) => {
            console.log('/sessions POST error: ', error);
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
    if (req.isAuthenticated()) {
        console.log('/sessions POST route hit with: ', req.body);
        let session = req.body;
        queryText = `INSERT INTO "sessions" ("user_id", "location_id", "student_name", "school_id", "grade_id")
        VALUES ($1, $2, $3, $4, $5);`;
        pool.query(queryText, [req.user.id, session.location.id, session.name, session.school, session.grade])
        .then((results) => {
            console.log('back from /sessions POST with: ', results.rows);
            res.sendStatus(201);
        }).catch((error) => {
            console.log('/sessions POST error: ', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;