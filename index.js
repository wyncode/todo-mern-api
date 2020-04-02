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

app.post('/users', (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.get('/users', (req, res) => {
  User.find({})
    .then(users => {
      res.status(200).send(users);
    })
    .catch(e => {
      res.status(500).send();
    });
});

app.get('/users/:id', (req, res) => {
  const _id = req.params.id;
  if (mongoose.Types.ObjectId.isValid(_id)) {
    User.findById(_id)
      .then(user => {
        if (!user) {
          // The gotcha here is that this will only trigger if the param sent is 12 bits (12 character string)
          return res.status(404).send();
        }
        res.send(user);
      })
      .catch(e => {
        console.log(e.toString());
        res.status(500).send();
      });
  } else {
    res.status(400).send('Not a valid user id');
  }
});

// ******************************************** //

app.get('/tasks', (req, res) => {
  Task.find({})
    .then(tasks => {
      res.status(200).send(tasks);
    })
    .catch(e => {
      res.status(500).send();
    });
});

app.get('/tasks/:id', (req, res) => {
  const _id = req.params.id;
  console.log(_id);
  if (mongoose.Types.ObjectId.isValid(_id)) {
    Task.findById(_id)
      .then(task => {
        if (!task) {
          // The gotcha here is that this will only trigger if the param sent is 12 bits (12 character string)
          return res.status(404).send();
        }
        res.send(task);
      })
      .catch(e => {
        console.log(e.toString());
        res.status(500).send();
      });
  } else {
    res.status(400).send('Not a valid task id');
  }
});

app.post('/tasks', (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then(() => {
      res.status(201).send(task);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.listen(port, () => {
  console.log(`Express server is up on port ${port}`);
});
