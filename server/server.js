
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const searchFTRouter = require('./routes/searchFullText.router');
const profileRouter = require('./routes/profile.router');
const detailsRouter = require('./routes/details.router');
const quizRouter = require('./routes/quiz.router');
const studentRouter = require('./routes/student.router');

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
app.use('/api/searchFullText', searchFTRouter);
app.use('/profile', profileRouter);
app.use('/details', detailsRouter);
app.use('/quiz', quizRouter);
app.use('/student', studentRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
