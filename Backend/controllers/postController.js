const axios = require('axios');
const Post = require('../models/post');

module.exports = {
  // Function to fetch posts for a specific user from the API and store in the database
  fetchPosts: async (req, res) => {
    const userId = req.params.userId;
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      const posts = response.data;
      await Post.bulkCreate(posts);
      res.json({ message: 'Posts fetched and stored successfully.' });
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  },

  // Function to handle bulk adding of posts to the database
  // bulkAddPosts: async (req, res) => {
  //   const userId = req.params.userId;
  //   try {
  //     // Assuming you have some logic to fetch posts data for the specific user from the API
  //     const postsData = /* logic to fetch posts data */;

  //     // Check if any posts already exist for the specific user in the database
  //     const existingPosts = await Post.findAll({ where: { userId: userId } });
  //     if (existingPosts.length === 0) {
  //       // If no posts exist in the database for the specific user, bulk add the posts
  //       await Post.bulkCreate(postsData);
  //       res.json({ message: 'Posts bulk added successfully.' });
  //     } else {
  //       res.json({ message: 'Posts already exist in the database.' });
  //     }
  //   } catch (error) {
  //     console.error('Error adding posts:', error);
  //     res.status(500).json({ error: 'Internal server error.' });
  //   }
  // },
  bulkAddPosts: async (req, res) => {
    const userId = req.params.userId;
    try {
      // Assuming you have some logic to fetch posts data for the specific user from the API
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      const postsData = response.data;

      // Check if any posts already exist for the specific user in the database
      const existingPosts = await Post.findAll({ where: { userId: userId } });

      if (existingPosts.length === 0) {
        // If no posts exist in the database for the specific user, bulk add the posts
        await Post.bulkCreate(postsData);
        res.json({ message: 'Posts bulk added successfully.' });
      } else {
        res.json({ message: 'Posts already exist in the database.' });
      }
    } catch (error) {
      console.error('Error adding posts:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  },

  // Function to handle downloading posts in Excel format
  downloadPostsInExcel: async (req, res) => {
    const userId = req.params.userId;
    try {
      // Fetch posts for the specific user from the database
      const posts = await Post.findAll({ where: { userId: userId } });

      // Convert posts data to Excel format and initiate download
      // Implement logic to convert posts to Excel format and initiate download
      res.json({ message: 'Download initiated.' });
    } catch (error) {
      console.error('Error downloading posts:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }
};
