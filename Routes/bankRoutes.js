const express = require('express');
const router = express.Router();
const bankController = require('../controllers/bank.controller');
const { createBank, validateBank } = bankController;
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, validateBank, createBank);

module.exports = router;