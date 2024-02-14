const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postController');

// Route to get posts by user ID
router.get('/:userId', PostController.getPostsByUserId);

// Route to add multiple posts in bulk
router.post('/bulk', PostController.addPostsBulk);

module.exports = router;
