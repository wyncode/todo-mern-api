const router = require('express').Router(),
  { sendWelcomeEmail, forgotPasswordEmail } = require('../../emails'),
  jwt = require('jsonwebtoken'),
  User = require('../../db/models/user');

// ***********************************************//
// Create a user
// ***********************************************//
router.post('/api/users/', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({
      name,
      email,
      password
    });

    const token = await user.generateAuthToken();
    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'Strict',
      secure: process.env.NODE_ENV !== 'production' ? false : true
    });
    sendWelcomeEmail(user.email, user.name);
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
});

// ***********************************************//
// Login a user
// ***********************************************//
router.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
});

// ******************************
// Password Reset Request
// This route sends an email that the
// user must click within 10 minutes
// to reset their password.
// ******************************
router.get('/password', async (req, res) => {
  try {
    const { email } = req.query,
      user = await User.findOne({ email });
    if (!user) throw new Error("account doesn't exist");
    // Build jwt token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '10m'
    });
    forgotPasswordEmail(email, token);
    res.json({ message: 'reset password email sent' });
  } catch (e) {
    res.json({ error: e.toString() });
  }
});

// ******************************
// Redirect to password reset page
// ******************************
router.get('/password/:token', (req, res) => {
  const { token } = req.params;
  try {
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) throw new Error(err.message);

      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 600000,
        sameSite: 'Strict'
      });
      res.redirect(process.env.URL + '/update-password');
    });
  } catch (e) {
    res.json({ error: e.toString() });
  }
});

module.exports = router;
