const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        const query = `SELECT "location"."location_name", "sessions"."id", "sessions"."location_id", "sessions"."session_date", "sessions"."student_name", "sessions"."school_id", 
        "sessions"."grade_id", "sessions"."subjects_id", "sessions"."end_time" - "sessions"."start_time" AS "time", 
        "schools"."school_name", "grade"."grade_level", "subjects"."subjects" FROM "sessions"
        JOIN "schools" ON "schools"."id" = "sessions"."school_id" 
        JOIN "subjects" ON "subjects"."id" = "sessions"."subjects_id"
        JOIN "grade" ON "grade"."id" = "sessions"."grade_id"
        JOIN "location" ON "location"."id" = "sessions"."location_id";`;
        pool.query(query).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);

    }
});

router.get('/library-summary', (req, res) => {
    if (req.isAuthenticated()) {
        const query = `SELECT  "location"."location_name", COUNT("sessions"."location_id") FROM "sessions"
        JOIN "location" ON "location"."id" = "sessions"."location_id" 
        GROUP BY "location"."location_name"
        ORDER BY "count" DESC;`;
        pool.query(query).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);

    }
});

router.get('/school-reach/:id', (req, res) => {
    if (req.isAuthenticated()) {
        if (req.params.id == 0) {
            const query = `SELECT "schools"."school_name", COUNT("sessions"."school_id") FROM "sessions"
            JOIN "schools" ON "schools"."id" = "sessions"."school_id" 
            GROUP BY "schools"."school_name"
            ORDER BY "count" DESC;`;
            pool.query(query).then((results) => {
                res.send(results.rows);
            }).catch((error) => {
                res.sendStatus(500);
            });
        } else {
            const query = `SELECT "schools"."school_name", COUNT("sessions"."school_id") FROM "sessions"
            JOIN "schools" ON "schools"."id" = "sessions"."school_id"
            WHERE "location_id" = $1
            GROUP BY "schools"."school_name"
            ORDER BY "count" DESC;`;
            pool.query(query, [req.params.id]).then((results) => {
                res.send(results.rows);
            }).catch((error) => {
                res.sendStatus(500);
            });
        }
    } else {
        res.sendStatus(403);

    }
});

router.get('/active', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('/sessions/active GET hit');
        const queryText = `SELECT "sessions"."student_name", "sessions"."session_date", "sessions"."id", "sessions"."start_time", "schools"."school_name", "grade"."grade_level"
        FROM "sessions" JOIN "schools" ON "schools"."id" = "sessions"."school_id"
        JOIN "grade" ON "grade"."id" = "sessions"."grade_id"
        WHERE "user_id" = $1 AND "end_time" is NULL;`;
        pool.query(queryText, [req.user.id]).then((results) => {
            console.log('back from /sessions/active GET with: ', results.rows);
            res.send(results.rows);
        }).catch((error) => {
            console.log('/sessions/active GET error: ', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(401);
    }
});

router.get('/completed', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('/sessions/active GET hit');
        // const queryText = `SELECT "sessions"."student_name", "sessions"."id", "sessions"."session_date", 
        // "sessions"."topics", "sessions"."end_time" - "sessions"."start_time" AS "time", "subjects"."subjects", 
        // "schools"."school_name", "grade"."grade_level"
        // FROM "sessions" JOIN "schools" ON "schools"."id" = "sessions"."school_id"
        // JOIN "grade" ON "grade"."id" = "sessions"."grade_id"
        // JOIN "subjects" ON "subjects"."id" = "sessions"."subjects_id"
        // WHERE "user_id" = $1 AND "end_time" is not NULL
        // ORDER BY "session_date" DESC;`;
        const queryText = `SELECT "sessions".*, "sessions"."end_time" - "sessions"."start_time" AS "time", 
        "subjects"."subjects", "schools"."school_name", "grade"."grade_level"
        FROM "sessions" JOIN "schools" ON "schools"."id" = "sessions"."school_id"
        JOIN "grade" ON "grade"."id" = "sessions"."grade_id"
        JOIN "subjects" ON "subjects"."id" = "sessions"."subjects_id"
        WHERE "user_id" = $1 AND "end_time" is not NULL ORDER BY "session_date" DESC;`;
        pool.query(queryText, [req.user.id]).then((results) => {
            console.log('back from /sessions/completed GET with: ', results.rows);
            res.send(results.rows);
        }).catch((error) => {
            console.log('/sessions/completed GET error: ', error);
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

/**
 * PUT route template
 */
router.put('/', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('in /sessions PUT with: ', req.body);
        let edit = req.body;
        const queryText = `UPDATE "sessions" SET "subjects_id" = $1, "topics" = $2, "end_time" = CURRENT_TIME
        WHERE "id" = $3;`;
        pool.query(queryText, [edit.subject, edit.topic, edit.id]).then((results) => {
            console.log('back from /sessions PUT with: ', results.rows);
            res.sendStatus(201);
        }).catch((error) => {
            console.log('/sessions PUT error: ', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(401);
    }
})

router.put('/edit', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('in /sessions/edit PUT with: ', req.body);
        let edit = req.body;
        const queryText = `UPDATE "sessions" SET "session_date" = $1, "student_name" = $2, "school_id" = $3, 
        "grade_id" = $4, "subjects_id" = $5, "topics" = $6, "end_time" = $7
        WHERE "id" = $8;`;
        pool.query(queryText, [edit.session_date, edit.student_name, edit.school_id,
        edit.grade_id, edit.subjects_id, edit.topics, edit.end_time, edit.id]).then((results) => {
            console.log('back from /sessions PUT with: ', results.rows);
            res.sendStatus(201);
        }).catch((error) => {
            console.log('/sessions/edit PUT error: ', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(401);
    }
})

module.exports = router;