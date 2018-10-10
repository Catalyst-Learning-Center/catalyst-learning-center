const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        const query = `SELECT "sessions"."session_date", "sessions"."student_name", "sessions"."school_id", 
        "sessions"."grade_id", "sessions"."subjects_id", "sessions"."start_time", "sessions"."end_time", 
        "schools"."school_name", "grade"."grade_level", "subjects"."subjects" FROM "sessions"
        JOIN "schools" ON "schools"."id" = "sessions"."school_id" 
        JOIN "subjects" ON "subjects"."id" = "sessions"."subjects_id"
        JOIN "grade" ON "grade"."id" = "sessions"."grade_id";`;
        pool.query(query).then((results) => {
            res.send(results.rows);
        }).catch((error) => {
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;