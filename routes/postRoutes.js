// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload'); // <-- Import the upload middleware

// Get the new functions from the controller
const { createPost, getAllPosts, likePost, unlikePost } = require('../controllers/postController');

// @route   POST /api/posts
// @desc    Create a post with image
// @access  Private
router.post('/', [auth, upload.single('image')], createPost);

// @route   GET /api/posts
// @desc    Get all posts
// @access  Private
router.get('/', auth, getAllPosts);

// @route   PUT /api/posts/like/:id
// @desc    Like a post
// @access  Private
router.put('/like/:id', auth, likePost);

// @route   PUT /api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
router.put('/unlike/:id', auth, unlikePost);

module.exports = router;