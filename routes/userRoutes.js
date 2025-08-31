// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getAllUsers } = require('../controllers/userController');

// @route   GET /api/users
// @desc    Get all users
// @access  Private
router.get('/', auth, getAllUsers);

module.exports = router;