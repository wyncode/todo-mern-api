const express = require('express');
require('./db/mongoose');

const app = express();
const userRouter = require('./routes/user');

app.use(express.json());

app.use(userRouter);

module.exports = app;
