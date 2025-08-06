// controllers/postController.js
const { validationResult } = require('express-validator');
const User = require('../models/user');
const Post = require('../models/Post');

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
exports.createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const newPost = new Post({
      text: req.body.text,
      image: imagePath,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    });

    const post = await newPost.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Get all posts
// @route   GET /api/posts
// @access  Private
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Like a post
// @route   PUT /api/posts/like/:id
// @access  Private
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked by this user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Unlike a post
// @route   PUT /api/posts/unlike/:id
// @access  Private
exports.unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked by this user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length === 0
    ) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    // Get the remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};