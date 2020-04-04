if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const cors = require('cors');

// import db
require('./db/mongoose');
// import routes
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');

const app = express();
app.use(cors());
const port = process.env.PORT || 8080;

// app.use((req, res, next) => {
//   res.status(503).send('Site is down for maintenance, check back soon.');
// });

// Parse incomin JSON into objects
app.use(express.json());
// Call routes
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Express server is up on port ${port}`);
});
