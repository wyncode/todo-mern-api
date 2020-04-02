if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const mongoose = require('mongoose');

require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }
});

app.get('/users/:id', async (req, res) => {
  const _id = req.params.id;
  if (mongoose.Types.ObjectId.isValid(_id)) {
    try {
      const user = await User.findById(_id);
      if (!user) {
        // The gotcha here is that this will only trigger if the param sent is 12 bits (12 character string)
        return res.status(404).send();
      }
      res.send(user);
    } catch (e) {
      res.status(500).send();
    }
  } else {
    res.status(400).send('Not a valid user id');
  }
});

// ******************************************** //

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(500).send();
  }
});

app.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id;
  if (mongoose.Types.ObjectId.isValid(_id)) {
    try {
      const task = await Task.findById(_id);
      res.send(task);
      if (!task) {
        return res.status(404).send();
      }
    } catch (e) {
      res.status(500).send();
    }
  } else {
    res.status(400).send('Not a valid task id');
  }
});

app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  try {
    task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(port, () => {
  console.log(`Express server is up on port ${port}`);
});
