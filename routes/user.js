const express = require('express');
const router = new express.Router();
const User = require('../models/user');

// Route for creating a new user
router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send({ user });
  } catch (e) {
    res.status(400).send(e);
  }
});

// Route for looking up a user
router.get('/user/me', async (req, res) => {
  const { email } = req.body;

  User.findOne({ email }, (error, user) => {
    if (error) {
      return console.log('No such user found.');
    }
    res.json(user);
  });
});

module.exports = router;
