const express = require('express');
const router = express.Router();
const ExcelController = require('../controllers/excelController');

router.get('/:userId', ExcelController.downloadPostsExcel);

module.exports = router;
