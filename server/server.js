
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const applicationsRouter = require('./routes/applications.router');
const gradesRouter = require('./routes/grades.router');
const locationsRouter = require('./routes/locations.router');
const schoolsRouter = require('./routes/schools.router');
const sessionsRouter = require('./routes/sessions.router');
const subjectsRouter = require('./routes/subjects.router');
const tutorsRouter = require('./routes/tutors.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/applications', applicationsRouter);
app.use('/grades', gradesRouter);
app.use('/locations', locationsRouter);
app.use('/schools', schoolsRouter);
app.use('/sessions', sessionsRouter);
app.use('/subjects', subjectsRouter);
app.use('/tutors', tutorsRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
