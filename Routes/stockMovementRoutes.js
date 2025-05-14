const express = require('express');
const router = express.Router();
const stockMovementController = require('../controllers/stockMovementController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/', authMiddleware, stockMovementController.getStockMovements);

module.exports = router;
