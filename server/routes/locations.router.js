const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route to retrieve library location data from server
router.get('/', (req, res) => {
        console.log('/locations GET route hit');
        const queryText = `SELECT * from "location" ORDER BY "location"."location_name";`;
        pool.query(queryText).then((results) => {
            console.log('back with: ', results.rows);
            res.send(results.rows);
        })//error handling
        .catch((error) => {
            console.log('Error making GET request: ', error);
        });//end error handling
});//end GET

// POST route to add a new library location
router.post('/', (req, res) => {
    if(req.isAuthenticated()) {
        console.log('locations POST route hit');
        console.log(req.body);
        let localeData = req.body;
        queryText = `INSERT INTO location ("location_name","location_address","location_city","location_state","location_zipcode","location_phone")
                    VALUES ($1,$2,$3,$4,$5,$6);`;
                    pool.query(queryText, [localeData.location_name,localeData.location_address,localeData.location_city,localeData.location_state,localeData.location_zipcode,localeData.location_phone])
        .then(() => {
            res.sendStatus(200);
        })//error handling
        .catch((error) => {
            console.log('Error making POST request:', error);
            res.sendStatus(500);
        });//end error handling
    }else{
        res.sendStatus(403);
    }//end isAuthenticted
});//end POST

// PUT route to edit library locations
router.put('/edit/:id', (req, res) => {
    if(req.isAuthenticated()) {
        console.log('/locations PUT route hit');
        const id = req.params.id;
        const location = req.body;
        console.log('location to update:', location, id);
        const queryText = `UPDATE "location" 
        SET "location_name"=$1,"location_address"=$2,"location_city"=$3,"location_state"=$4,"location_zipcode"=$5,"location_phone"=$6 
        WHERE id =$7;`;

        const queryValues = [
            location.location_name,
            location.location_address,
            location.location_city,
            location.location_state,
            location.location_zipcode,
            location.location_phone,
            req.params.id,
        ];

        pool.query(queryText, queryValues)
        .then(() => {
            res.sendStatus(200);
        })//error handling
        .catch((error) => {
            console.log('Error making PUT request:', error);
            res.sendStatus(500);
        });//end error handling
    }else{
        res.sendStatus(403);
    }//end isAuthenticted
});//end PUT request

// PUT route to deactivate library location(s)
router.put('/status/:id', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('/locations/status PUT route hit with: ', req.params.id);
        const queryText = `UPDATE "location" SET "active" = NOT "active" WHERE "id" = $1;`;
        pool.query(queryText, [req.params.id]).then((results) => {
            console.log('back from /locations/status PUT with: ', results.rows);
            res.sendStatus(201);
        })//error handling
        .catch((error) => {
            console.log('/locations/status PUT error: ', error);
            res.sendStatus(500);
        });//end error handling
    } else {
        res.sendStatus(401);
    }//end isAuthenticated
});//end PUT deactivate route

module.exports = router;