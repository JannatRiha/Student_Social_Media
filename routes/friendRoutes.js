// routes/friendRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { sendFriendRequest, acceptFriendRequest } = require('../controllers/friendController');

// @route   PUT /api/friends/request/:id
// @desc    Send a friend request
// @access  Private
router.put('/request/:id', auth, sendFriendRequest);

// @route   PUT /api/friends/accept/:id
// @desc    Accept a friend request
// @access  Private
router.put('/accept/:id', auth, acceptFriendRequest);

module.exports = router;