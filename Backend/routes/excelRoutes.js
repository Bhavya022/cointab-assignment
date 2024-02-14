const express = require('express');
const router = express.Router();
const ExcelController = require('../controllers/excelController');

// Route to download posts as Excel for a specific user ID
router.get('/:userId', ExcelController.downloadPostsExcel);

module.exports = router;
