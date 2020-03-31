const express = require('express');
require('./db/mongoose');

const app = express();

app.use(express.json());
//import routes from routers folder

module.exports = app;
