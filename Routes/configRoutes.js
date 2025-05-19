const express = require('express');
const router = express.Router();
const configController = require('../controllers/configController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Bank configs
router.post('/banks', authMiddleware, configController.createBank);
router.get('/banks', authMiddleware, configController.getBanks);

// Billing configs
router.post('/billings', authMiddleware, configController.createBilling);
router.get('/billings', authMiddleware, configController.getBillings);

// Accounting configs
router.post('/accountings', authMiddleware, configController.createAccounting);
router.get('/accountings', authMiddleware, configController.getAccountings);

// Payment methods
router.post('/payment-methods', authMiddleware, configController.createPaymentMethod);
router.get('/payment-methods', authMiddleware, configController.getPaymentMethods);

module.exports = router;
