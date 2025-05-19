/**
 * @swagger
 * tags:
 *   name: Factures
 *   description: API endpoints for managing invoices
 */

/**
 * @swagger
 * /factures:
 *   get:
 *     summary: Retrieve a list of invoices
 *     tags: [Factures]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of invoices
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Facture'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     pages:
 *                       type: integer
 */

/**
 * @swagger
 * /factures:
 *   post:
 *     summary: Create a new invoice
 *     tags: [Factures]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FactureInput'
 *     responses:
 *       201:
 *         description: Invoice created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Facture'
 */

/**
 * @swagger
 * /factures/{id}/pdf:
 *   get:
 *     summary: Get invoice PDF with QR code
 *     tags: [Factures]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Invoice ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: PDF file of the invoice
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Invoice not found
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Facture:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the invoice
 *         numero:
 *           type: string
 *           description: Invoice number
 *         client:
 *           type: object
 *           description: Client information
 *           properties:
 *             _id:
 *               type: string
 *             nom:
 *               type: string
 *             adresse:
 *               type: string
 *         lignes:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               article:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   nom:
 *                     type: string
 *               quantite:
 *                 type: number
 *               prixUnitaire:
 *                 type: number
 *         totalHT:
 *           type: number
 *         tvaRate:
 *           type: number
 *         totalTTC:
 *           type: number
 *       example:
 *         _id: "60d21b4667d0d8992e610c85"
 *         numero: "INV-001"
 *         client:
 *           _id: "60d21b4967d0d8992e610c86"
 *           nom: "Client A"
 *           adresse: "123 Rue Exemple"
 *         lignes:
 *           - article:
 *               _id: "60d21b4f67d0d8992e610c87"
 *               nom: "Article 1"
 *             quantite: 2
 *             prixUnitaire: 50
 *         totalHT: 100
 *         tvaRate: 20
 *         totalTTC: 120
 *     FactureInput:
 *       type: object
 *       required:
 *         - client
 *         - lignes
 *       properties:
 *         client:
 *           type: string
 *           description: Client ID
 *         lignes:
 *           type: array
 *           items:
 *             type: object
 *             required:
 *               - article
 *               - quantite
 *               - prixUnitaire
 *             properties:
 *               article:
 *                 type: string
 *                 description: Article ID
 *               quantite:
 *                 type: number
 *               prixUnitaire:
 *                 type: number
 *       example:
 *         client: "60d21b4967d0d8992e610c86"
 *         lignes:
 *           - article: "60d21b4f67d0d8992e610c87"
 *             quantite: 2
 *             prixUnitaire: 50
 */

/**
 * @swagger
 * tags:
 *   name: Factures
 *   description: API endpoints for managing invoices
 */

const express = require('express');
const router = express.Router();
const factureController = require('../controllers/facture.controller');
const pdfController = require('../controllers/pdfController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, factureController.creerFacture);
router.get('/', authMiddleware, factureController.getFactures);

// New route to generate invoice PDF with QR code
router.get('/:id/pdf', authMiddleware, pdfController.generateFacturePDFWithQRCode);

module.exports = router;
