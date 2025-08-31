// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload'); // <-- Import the upload middleware
const { body } = require('express-validator');


// Get the new functions from the controller
const { createPost, getAllPosts, likePost, unlikePost,addComment,deleteComment, } = require('../controllers/postController');

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

router.post(
  '/comment/:id',
  auth,
  // Add validation for the comment text
  [body('text', 'Comment text is required').not().isEmpty()],
  addComment
);


router.delete('/comment/:id/:comment_id', auth, deleteComment);

module.exports = router;

// // routes/postRoutes.js

// // ... (existing imports)

// const {
//   createPost,
//   getAllPosts,
//   likePost,
//   unlikePost,
//   addComment,
//   deleteComment,
// } = require('../controllers/postController'); // <-- Add new functions

// // ... (existing routes)

// // @route   POST /api/posts/comment/:id
// // @desc    Add a comment to a post
// // @access  Private


// // @route   DELETE /api/posts/comment/:id/:comment_id
// // @desc    Delete a comment
// // @access  Private


// module.exports = router;