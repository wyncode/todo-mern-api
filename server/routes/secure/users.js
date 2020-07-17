const express = require('express'),
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
  const allowedUpdates = ['name', 'email', 'password', 'age'];
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
    res.status(400).json({ error: error.message });
  }
);

// ***********************************************//
// Delete a user's avatar
// ***********************************************//
router.delete('/api/users/me/avatar', async (req, res) => {
  req.user.avatar = null;
  await req.user.save();
  res.sendStatus(200);
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
    res.json(user.avatar);
  } catch (e) {
    res.sendStatus(404);
  }
});

// ***********************************************//
// Delete a user
// ***********************************************//
router.delete('/api/users/me', async (req, res) => {
  try {
    await req.user.remove();
    sendCancellationEmail(req.user.email, req.user.name);
    res.json(req.user);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;
