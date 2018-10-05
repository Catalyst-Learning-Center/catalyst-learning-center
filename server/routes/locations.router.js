const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log('/locations GET route hit');
    const queryText = `SELECT "id", "location_name" from "location";`;
    pool.query(queryText).then((results) => {
        console.log('back with: ', results.rows);
        res.send(results.rows);
    }).catch((error) => {
        console.log('error: ', error);
    })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;