const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

const nodemailer = require("nodemailer");



// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from database
  const queryText = `SELECT "permissions" FROM "users" WHERE "id" = $1;`;
  pool.query(queryText, [req.user.id]).then((results) => {
    let user = { ...req.user, permissions: results.rows[0].permissions }
    console.log(user);
    res.send(user);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  })
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  console.log('req: ', req.body);

  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id';
  pool.query(queryText, [username, password])
    .then(() => { res.sendStatus(201); })
    .catch((err) => { next(err); });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});


// Handles forgot password email
router.post('/forgot', (req,res)=>{
  console.log(req.body);
  let queryText = `SELECT "username" FROM "users" WHERE "username" LIKE $1;`
  pool.query(queryText, [req.body.userInfoEmail]).then((results)=>{
    if (results.rows.length){
      const auth = {
        type: 'OAuth2',
        user: 'catalystcenter.mail@gmail.com',
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      };
      console.log(auth);
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: auth
      });
      const mail = {
        from: "Catalyst Learning Center <catalystcenter.mail@gmail.com>",
        to: `${req.body.userInfoEmail}`,
        subject: "Log in Information",
        text: "Your password is the last four digits of your phone number",
        html: "<p>Your password is the last four digits of your phone number</p>"
      }
      transporter.sendMail(mail, function (err, info) {
        if (err) {
          console.log('ERROR', err);
        } else {
          // see https://nodemailer.com/usage
          console.log("info.messageId: " + info.messageId);
          console.log("info.envelope: " + info.envelope);
          console.log("info.accepted: " + info.accepted);
          console.log("info.rejected: " + info.rejected);
          console.log("info.pending: " + info.pending);
          console.log("info.response: " + info.response);
        }
        transporter.close();
      });
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  });
});

// clear all server session information about this user
router.get('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
