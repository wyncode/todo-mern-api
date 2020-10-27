const router = require('express').Router(),
  {
    getCurrentUser,
    updateCurrentUser,
    logoutUser,
    logoutAllDevices,
    deleteUser,
    uploadAvatar,
    updatePassword
  } = require('../../controllers/users');

// ***********************************************//
// Get current user
// ***********************************************//
router.get('/me', getCurrentUser);

// ***********************************************//
// Update a user
// ***********************************************//
router.patch('/me', updateCurrentUser);

// ***********************************************//
// Logout a user
// ***********************************************//
router.post('/logout', logoutUser);

// ***********************************************//
// Logout all devices
// ***********************************************//
router.post('/logoutAll', logoutAllDevices);

// ***********************************************//
// Delete a user
// ***********************************************//
router.delete('/me', deleteUser);

// ***********************************************//
// Upload avatar
// ***********************************************//
router.post('/avatar', uploadAvatar);

// ******************************
// Update password
// ******************************
router.put('/password', updatePassword);

module.exports = router;
