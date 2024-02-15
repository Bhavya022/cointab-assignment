const axios = require('axios');
const User = require('../models/User');

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      const users = response.data;
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Failed to fetch users from the external API' });
    }
  },

  addUser: async (req, res) => {
    try {
      const {  name, email, phone, website, city, company,userId } = req.body; 
      console.log(id)
      // Validate user input
      if (!name || !email || !phone || !website || !city || !company || !userId) {
        return res.status(400).json({ message: 'All fields are required' });
      }
         
      // Check if the user already exists
      const existingUser = await User.findOne({ where: { email } }); 
      if (existingUser) {
        return res.status(201).json({ message: 'User already exists' }); 
      }

      // Create the new user
      const newUser = await User.create({
        
        name,
        email,
        phone,
        website,
        city,
        company,
        userId 
      });

      res.status(201).json(newUser); 
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).json({ message: 'Failed to add user' });
    }
  },

  // Fetch user by email
  getUserByEmail: async (req, res) => {
    try {
      const { email } = req.query;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(201).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user by email:', error);
      res.status(500).json({ message: 'Failed to fetch user by email' });
    }
  }
};

module.exports = UserController;
