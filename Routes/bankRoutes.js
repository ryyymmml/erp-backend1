/**
 * @swagger
 * tags:
 *   name: Bank
 *   description: API for managing banks
 */

/**
 * @swagger
 * /bank:
 *   post:
 *     summary: Create a new bank
 *     tags: [Bank]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: MyBank
 *               code:
 *                 type: string
 *                 example: B123
 *     responses:
 *       201:
 *         description: Bank created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

const express = require('express');
const router = express.Router();
const bankController = require('../controllers/bank.controller');
const { createBank, validateBank } = bankController;
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, validateBank, createBank);

module.exports = router;