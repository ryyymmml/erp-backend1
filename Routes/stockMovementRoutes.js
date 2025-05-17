/**
 * @swagger
 * components:
 *   schemas:
 *     StockMovement:
 *       type: object
 *       required:
 *         - articleId
 *         - quantityChange
 *         - movementType
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the stock movement
 *         articleId:
 *           type: string
 *           description: ID of the article
 *         quantityChange:
 *           type: number
 *           description: The amount of change in stock
 *         movementType:
 *           type: string
 *           enum: [purchase, sale, adjustment]
 *           description: Type of stock movement
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date of movement
 *         relatedDocumentId:
 *           type: string
 *           description: ID of the related document (if any)
 *         relatedDocumentModel:
 *           type: string
 *           enum: [PurchaseOrder, Facture]
 *           description: Model name of the related document
 */

/**
 * @swagger
 * /stock-movements:
 *   get:
 *     summary: Get all stock movements
 *     tags: [StockMovement]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of stock movements
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StockMovement'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /stock-movements:
 *   post:
 *     summary: Add a new stock movement
 *     tags: [StockMovement]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StockMovement'
 *     responses:
 *       201:
 *         description: Stock movement added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StockMovement'
 *       400:
 *         description: Bad request
 */


const express = require('express');
const router = express.Router();
const stockMovementController = require('../controllers/stockMovementController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/', authMiddleware, stockMovementController.getStockMovements);
router.post('/', stockMovementController.addStockMovement);

module.exports = router;
