if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');

// import db
require('./db/mongoose');
// import routes
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');

const app = express();
const port = process.env.PORT || 8080;
// Parse incomin JSON into objects
app.use(express.json());
// Call routes
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Express server is up on port ${port}`);
});
