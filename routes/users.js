const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth.js');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const sharp = require('sharp');
const {
    sendWelcomeEmail,
    sendCancellationEmail,
    forgotPasswordEmail
  } = require('../emails/account'),
  passport = require('../middleware/passport');

router.get(
  '/passport',
  passport.authenticate('jwt', {
    session: false,
    failureRedirect: '/login'
  }),
  async (req, res) => {
    try {
      res.json({ message: req.user });
    } catch (e) {
      console.log(e);
    }
  }
);

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

router.post('/api/loginCheck', auth, async (req, res) => {
  try {
    res.json({ success: true });
  } catch (e) {
    res.status(400).send();
  }
});

// ***********************************************//
// Logout a user
// ***********************************************//
router.post('/api/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send({ message: 'Logged out!' });
  } catch (e) {
    res.status(500).send();
  }
});

// ***********************************************//
// Logout all devices
// ***********************************************//
router.post('/api/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});
// ***********************************************//
// Get current user
// ***********************************************//

router.get('/api/users/me', auth, async (req, res) => {
  res.send(req.user);
});

// ***********************************************//
// Update a user
// ***********************************************//
router.patch('/api/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// ***********************************************//
// Upload a user avatar
// ***********************************************//
const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image.'));
    }
    cb(undefined, true);
  }
});

router.post(
  '/api/users/me/avatar',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({
        width: 250,
        height: 250
      })
      .png()
      .toBuffer();

    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// ***********************************************//
// Delete a user's avatar
// ***********************************************//
router.delete('/api/users/me/avatar', auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

// ***********************************************//
// Serve a user's avatar
// ***********************************************//
router.get('/api/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set('Content-Type', 'image/png');
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

// ***********************************************//
// Delete a user
// ***********************************************//
router.delete('/api/users/me', auth, async (req, res) => {
  try {
    await req.user.remove();
    sendCancellationEmail(req.user.email, req.user.name);
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
