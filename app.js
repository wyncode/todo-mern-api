const express = require('express');
const cors = require('cors');

// import db
require('./db/mongoose');
// import routes
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');

const app = express();
app.use(cors());

// Parse incomin JSON into objects
app.use(express.json());
// Call routes
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
