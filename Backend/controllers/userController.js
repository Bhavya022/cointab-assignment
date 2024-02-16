const axios = require('axios');
const User = require('../models/user');

module.exports = {
  fetchAllUsers: async (req, res) => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      const users = response.data;
      
      // Check if any users already exist in the database
      const existingUsers = await User.findAll();
      if (existingUsers.length === 0) {
          // If no users exist in the database, store fetched users
          await User.bulkCreate(users);
      }

      // Send JSON response with user data
      res.json({ users: existingUsers });
  } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal server error.' });
  }
},


  // Function to fetch a user by ID
  fetchUserById: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findByPk(userId);
      res.json(user);
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  },

  // Function to fetch a user by email
  fetchUserByEmail: async (req, res) => {
    try {
      const userEmail = req.params.email;
      const user = await User.findOne({ where: { email: userEmail } });
      res.json(user);
    } catch (error) {
      console.error('Error fetching user by email:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  },

  // Function to add a user to the database
  addUser: async (req, res) => {
    try {
      const user = req.body;
      console.log(user) 
      // Check if the user already exists in the database
      const existingUser = await User.findOne({ where: { email: user.email } });

      if (existingUser) {
        // If user exists, show "Open" button and hide "Add" button 
        console.log( 'User already exists.')
        res.json({ message: 'User already exists.', showOpenButton: true });
      } else {
        // If user doesn't exist, add to database and show "Open" button
        await User.create(user); 
        res.json({ message: 'User added successfully.', showOpenButton: true }); 
        console.log( 'User added.')
      }
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).json({ error: 'Internal server error.',error });
    }
  }
};
