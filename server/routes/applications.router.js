const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

/**
 * GET route template
 */
router.get('/', (req, res) => {
    
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    if (req.body.captcha === undefined || req.body.captcha === '' || req.body.captcha === null){
        return res.json({"success": false, "msg": "Please fill out captcha"});
    }

    // Secret Key
    const secretKey = '6Ld9BHQUAAAAADgfahozNvUGW9a0Cohaz7RkAdHI';

    //verify URL
    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

    // make request to verifyUrl
    axios({
        method: 'POST',
        url: verifyUrl,
    }).then((response)=>{
        body = response.data;
        // if not successful
        if (body.success !== undefined && !body.success) {
            return res.json({ "success": false, "msg": "Failed captcha verification" });
        }
        //if successful
        return res.json({ "success": true, "msg": "Captcha passed" });
    }).catch((error) => {
        console.log('ERROR', error);
        res.sendStatus(500);
    })
});

module.exports = router;