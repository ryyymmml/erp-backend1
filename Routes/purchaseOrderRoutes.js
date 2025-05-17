
const express = require('express');
const router = express.Router();
const purchaseOrderController = require('../controllers/purchaseOrderController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, purchaseOrderController.createPurchaseOrder);
router.post('/:purchaseOrderId/receive', authMiddleware, purchaseOrderController.receivePurchaseOrder);

router.get('/', authMiddleware, purchaseOrderController.getPurchaseOrders);
router.get('/:id', authMiddleware, purchaseOrderController.getPurchaseOrderById);
router.get('/:id/print', authMiddleware, purchaseOrderController.printPurchaseOrder);
router.get('/:id/print-reception', authMiddleware, purchaseOrderController.printReceptionOrder);
router.post('/:id/convert-to-invoice', authMiddleware, purchaseOrderController.convertPurchaseOrderToInvoice);

module.exports = router;
