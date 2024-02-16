const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Route to fetch posts for a specific user from the API and store in the database
router.get('/fetchPosts/:userId', postController.fetchPosts);

// Route to bulk add posts to the database
router.post('/bulkAddPosts/:userId', postController.bulkAddPosts);

// Route to handle downloading posts in Excel format
router.get('/downloadPostsInExcel/:userId', postController.downloadPostsInExcel);

module.exports = router;
