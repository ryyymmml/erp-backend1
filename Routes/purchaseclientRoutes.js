const express = require('express');
const router = express.Router();
const PurchaseClientController = require('../controllers/purchaseclient.controller');
const { authMiddleware } = require('../middleware/authMiddleware');


router.post('/', authMiddleware, PurchaseClientController.createPurchaseClient);
router.post('/:purchaseClientId/receive', authMiddleware, PurchaseClientController.receivePurchaseClient);

router.get('/', authMiddleware, PurchaseClientController.getPurchaseClients);
router.get('/:id', authMiddleware, PurchaseClientController.getPurchaseClientById);
router.get('/:id/print', authMiddleware, PurchaseClientController.printPurchaseClient);
router.get('/:id/print-reception', authMiddleware, PurchaseClientController.printReceptionOrder);
router.post('/:id/convert-to-invoice', authMiddleware, PurchaseClientController.convertPurchaseClientToInvoice);

module.exports = router;