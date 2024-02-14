const exceljs = require('exceljs');
const { Post } = require('../models/post');

const ExcelController = {
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
      res.setHeader('Content-Disposition', 'attachment; filename=' + 'posts.xlsx');

      await workbook.xlsx.write(res);
      res.end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = ExcelController;
