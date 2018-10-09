const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    let query = `SELECT * FROM "subjects";`;
    pool.query(query).then((results)=>{
        res.send(results.rows);
    }).catch((error)=>{
        console.log('Error getting subjects from database', error);
        res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;