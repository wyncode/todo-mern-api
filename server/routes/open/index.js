const router = require('express').Router(),
  {
    createUser,
    loginUser,
    requestPasswordReset,
    passwordRedirect
  } = require('../../controllers/users');

// ***********************************************//
// Create a user
// ***********************************************//
router.post('/', createUser);

// ***********************************************//
// Login a user
// ***********************************************//
router.post('/login', loginUser);

// ******************************
// Password Reset Request
// This route sends an email that the
// user must click within 10 minutes
// to reset their password.
// ******************************
router.get('/password', requestPasswordReset);

// ******************************
// Redirect to password reset page
// ******************************
router.get('/password/:token', passwordRedirect);

module.exports = router;
