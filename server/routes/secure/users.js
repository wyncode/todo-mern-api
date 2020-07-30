const express = require('express'),
  cloudinary = require('cloudinary').v2,
  router = new express.Router(),
  User = require('../../db/models/user'),
  multer = require('multer'),
  sharp = require('sharp'),
  { sendCancellationEmail } = require('../../emails');

// ***********************************************//
// Login Check
// ***********************************************//
router.post('/api/loginCheck', async (req, res) => res.sendStatus(200));

// ***********************************************//
// Logout a user
// ***********************************************//
router.post('/api/users/logout', async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.clearCookie('jwt');
    res.json({ message: 'Logged out!' });
  } catch (e) {
    res.status(500).send();
  }
});

// ***********************************************//
// Logout all devices
// ***********************************************//
router.post('/api/users/logoutAll', async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.clearCookie('jwt');
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send();
  }
});
// ***********************************************//
// Get current user
// ***********************************************//

router.get('/api/users/me', async (req, res) => {
  res.json(req.user);
});

// ***********************************************//
// Update a user
// ***********************************************//
router.patch('/api/users/me', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'avatar'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation)
    return res.status(400).send({ error: 'Invalid updates!' });
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.json(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// ***********************************************//
// Delete a user
// ***********************************************//
router.delete('/api/users/me', async (req, res) => {
  try {
    await req.user.remove();
    sendCancellationEmail(req.user.email, req.user.name);
    res.clearCookie('jwt');
    res.json(req.user);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post('/api/users/avatar', async (req, res) => {
  // console.log(req.files.avatar);
  try {
    const response = await cloudinary.uploader.upload(
      req.files.avatar.tempFilePath
    );
    req.user.avatar = response.secure_url;
    await req.user.save();
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
