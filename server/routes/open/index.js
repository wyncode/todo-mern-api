const router = require('express').Router(),
  { forgotPasswordEmail } = require('../../emails'),
  bcrypt = require('bcryptjs');

// ***********************************************//
// Login a user
// ***********************************************//
router.post('/api/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'Strict'
    });
    res.send({ user });
  } catch (e) {
    res.status(400).send();
  }
});

// ***********************************************//
// Create a user
// ***********************************************//
router.post('/api/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    sendWelcomeEmail(user.email, user.name);
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// ***********************************************//
// Reset Password
// ***********************************************//
router.get('/api/users/password/reset', async (req, res) => {
  let newPassword = await bcrypt.hash(req.query.password, 8);
  const update = { password: newPassword };
  const filter = { email: req.query.email };

  const user = await User.findOne({
    email: req.query.email
  });

  try {
    if (user.tokens[0].token !== req.query.token) {
      throw new Error();
    }

    await User.findOneAndUpdate(filter, update);
    res.redirect('/');
  } catch (e) {
    res.status(400).send(e.toString());
  }
});

// ***********************************************//
// Reset Password Email Request
// ***********************************************//
router.get('/api/users/password/forgot', async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.query.email
    });

    forgotPasswordEmail(user.email, user.tokens[0].token, req.query.password);
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e.toString());
  }
});

module.exports = router;
