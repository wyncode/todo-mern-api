const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');

const Task = require('../models/task');

// ***********************************************//
// Get all tasks
// ***********************************************//
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (e) {
    res.status(500).send();
  }
});

// ***********************************************//
// Get a specific task
// ***********************************************//
router.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(400).send('Not a valid task id');
  }
  try {
    const task = await Task.findById(_id);
    res.send(task);
    if (!task) {
      return res.status(404).send();
    }
  } catch (e) {
    res.status(500).send();
  }
});

// ***********************************************//
// Create a task
// ***********************************************//
router.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  try {
    task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// ***********************************************//
// Update a task
// ***********************************************//
router.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }
  try {
    // new: true will return the new task after it has been updated instead of the old user.
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// ***********************************************//
// Delete a task
// ***********************************************//
router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
