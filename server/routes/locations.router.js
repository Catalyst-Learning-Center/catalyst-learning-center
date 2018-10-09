const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log('/locations GET route hit');
    const queryText = `SELECT * from "location";`;
    pool.query(queryText).then((results) => {
        console.log('back with: ', results.rows);
        res.send(results.rows);
    }).catch((error) => {
        console.log('error: ', error);
    })
});//end GET

/**
 * POST route template
 */
router.post('/', (req, res) => {
    console.log('locations POST route hit');
    
});//end POST

/**
 * PUT route template
 */
router.put('/:id', (req, res) => {
    console.log('/locations PUT route hit');
    const id = req.params.id;
    const location = req.body;
    console.log('location to update:', location);
    const queryText = 'UPDATE "location" SET "location_name" =$1,"location_address" =$2,"location_city"=$3,"location_state"=$4,"location_zipcode"=$5,"location_phone"=$6 WHERE id =$7;';
    pool.query(queryText, [locations.location, id])
    .then((result) => {
        console.log('query results: ', result);
        res.sendStatus(200);
    })//error handling
    .catch((error) => {
        console.log('error making update query:', error);
        res.sendStatus(500);
    });
});//end PUT request


module.exports = router;