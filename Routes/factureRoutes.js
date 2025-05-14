const express = require('express');
const router = express.Router();
const factureController = require('../controllers/factureController');
const { authMiddleware } = require('../middleware/authMiddleware');
router.post('/', authMiddleware, factureController.createInvoice);

router.get('/', authMiddleware, factureController.getInvoices);
router.get('/:id', authMiddleware, factureController.getInvoiceById);
router.get('/:id/print', authMiddleware, factureController.printInvoice);

module.exports = router;
