// import db
require('./db/mongoose');

const express = require('express'),
  cors = require('cors'),
  // import routes
  userRouter = require('./routes/users'),
  cookieParser = require('cookie-parser'),
  taskRouter = require('./routes/tasks');

const app = express();
app.use(cors());

// Parse incomin JSON into objects
app.use(express.json());
app.use(cookieParser());
// Call routes
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
