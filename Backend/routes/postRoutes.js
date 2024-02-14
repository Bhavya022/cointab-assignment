const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postController');

router.get('/:userId', PostController.getPostsByUserId);
router.post('/bulk', PostController.addPostsBulk);

module.exports = router;
