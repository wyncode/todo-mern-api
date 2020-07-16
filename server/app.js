// import db
require('./db');

const express = require('express'),
  // import routes
  userRouter = require('./routes/secure/users'),
  cookieParser = require('cookie-parser'),
  taskRouter = require('./routes/secure/tasks'),
  openRoutes = require('./routes/open'),
  passport = require('./middleware/authentication'),
  app = express();

// Parse incoming JSON into objects
app.use(express.json());

// Unauthenticated routes
app.use(openRoutes);

app.use(cookieParser());
app.use(
  passport.authenticate('jwt', {
    session: false
  })
);

//  Authenticated  Routes
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
