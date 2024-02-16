const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to fetch all users from the API and store in the database
router.get('/fetchUsers', userController.fetchAllUsers);

// Route to fetch a user by ID
router.get('/fetchUserById/:id', userController.fetchUserById);

// Route to fetch a user by email
router.get('/fetchUserByEmail/:email', userController.fetchUserByEmail);

// Route to add a user to the database
router.post('/addUser', userController.addUser);

module.exports = router;
