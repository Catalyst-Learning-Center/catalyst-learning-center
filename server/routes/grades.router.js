const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all stored grades from the database
router.get('/', (req, res) => {
    console.log('/grades GET route hit');
    const queryText = `SELECT * FROM "grade" ORDER BY "id";`;
    pool.query(queryText).then((results) => {
        console.log('back from /grades GET with: ', results.rows);
        res.send(results.rows);
    }).catch((error) => {
        console.log('/grades GET error: ', error);
        res.sendStatus(500);
    });//end error handling
});//end grades router

module.exports = router;