const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Route to get all users
router.get('/', UserController.getAllUsers);

// Route to add a new user
router.post('/', UserController.addUser); 

// Route to get a user by email
router.get('/email', UserController.getUserByEmail);

module.exports = router;
