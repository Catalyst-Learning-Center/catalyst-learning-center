const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route to display schools in a dropdown via the sessions view and order them alphabetically
router.get('/', (req, res) => {
    console.log('/schools GET route hit');
    const queryText = `SELECT * FROM "schools" ORDER BY "school_name";`;
    pool.query(queryText).then((results) => {
        console.log('back from /schools GET with: ', results.rows);
        res.send(results.rows);
    }).catch((error) => {
        console.log('/schools GET error: ', error);
        res.sendStatus(500);
    });//end error handling
});//end schools GET route

module.exports = router;