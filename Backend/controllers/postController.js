const axios = require('axios');
const User = require('../models/User'); // Corrected import statement for User model
const Post = require('../models/Post'); // Corrected import statement for Post model
const exceljs = require('exceljs');

const PostController = {
  getPostsByUserId: async (req, res) => {
    try {
      const userId = req.params.userId;
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      const posts = response.data;

      if (posts.length === 0) {
        return res.status(404).json({ message: 'No posts found for this user' });
      }

      const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
      const user = userResponse.data;

      res.json({ user, posts });
    } catch (error) {
      console.error('Error fetching posts by user ID:', error);
      res.status(500).json({ message: 'Failed to fetch posts by user ID' });
    }
  },

  addPostsBulk: async (req, res) => {
    try {
      const posts = req.body;
      
      // Check if the request body is an array
      if (!Array.isArray(posts)) {
        return res.status(400).json({ message: 'Request body must be an array of posts' });
      }

      // Validate each post object in the array
      posts.forEach(post => {
        if (!post.userId || !post.title || !post.body) {
          throw new Error('Invalid post data');
        }
      });

      const createdPosts = await Post.bulkCreate(posts);
      res.status(201).json(createdPosts);
    } catch (error) {
      console.error('Error adding posts in bulk:', error);
      res.status(500).json({ message: 'Failed to add posts in bulk' });
    }
  },

  downloadPostsExcel: async (req, res) => {
    try {
      const userId = req.params.userId;
      const posts = await Post.findAll({ where: { userId } });

      if (posts.length === 0) {
        return res.status(404).json({ message: 'No posts found for this user' });
      }

      const workbook = new exceljs.Workbook();
      const worksheet = workbook.addWorksheet('Posts');

      worksheet.columns = [
        { header: 'Title', key: 'title', width: 40 },
        { header: 'Body', key: 'body', width: 100 }
      ];

      posts.forEach(post => {
        worksheet.addRow({ title: post.title, body: post.body });
      });

      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=posts.xlsx');

      await workbook.xlsx.write(res);
      res.end();
    } catch (error) {
      console.error('Error downloading posts as Excel:', error);
      res.status(500).json({ message: 'Failed to download posts as Excel' });
    }
  }
};

module.exports = PostController;
