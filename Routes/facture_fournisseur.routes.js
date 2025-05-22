/**
 * @swagger
 * components:
 *   schemas:
 *     LigneFacture:
 *       type: object
 *       required:
 *         - article
 *         - quantite
 *         - prixUnitaire
 *       properties:
 *         article:
 *           type: string
 *           description: ID de l'article
 *         quantite:
 *           type: number
 *           description: Quantité d'article
 *         prixUnitaire:
 *           type: number
 *           description: Prix unitaire de l'article
 *         description:
 *           type: string
 *           description: Description optionnelle de la ligne

 *     FactureFournisseur:
 *       type: object
 *       required:
 *         - fournisseur
 *         - lignes
 *         - totalHT
 *         - totalTTC
 *       properties:
 *         _id:
 *           type: string
 *           description: ID auto-généré
 *         numero:
 *           type: string
 *           description: Numéro unique de la facture
 *         fournisseur:
 *           type: string
 *           description: ID du fournisseur
 *         type:
 *           type: string
 *           enum: [invoice, quote]
 *           description: Type de la facture
 *         lignes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/LigneFacture'
 *         totalHT:
 *           type: number
 *           description: Total hors taxe
 *         tvaRate:
 *           type: number
 *           description: Taux de TVA (par défaut 20)
 *         totalTTC:
 *           type: number
 *           description: Total TTC
 *         dateFacturation:
 *           type: string
 *           format: date-time
 *           description: Date de facturation
 *         status:
 *           type: string
 *           enum: [en attente, payée, annulée]
 *           description: Statut de la facture
 *         purchaseOrderId:
 *           type: string
 *           description: ID du bon de commande lié (facultatif)
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * tags:
 *   name: FactureFournisseur
 *   description: API de gestion des factures fournisseurs
 */

/**
 * @swagger
 * /facture_fournisseurs:
 *   post:
 *     summary: Créer une nouvelle facture fournisseur
 *     tags: [FactureFournisseur]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FactureFournisseur'
 *     responses:
 *       201:
 *         description: Facture créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FactureFournisseur'
 *       400:
 *         description: Erreur de validation
 */

/**
 * @swagger
 * /facture_fournisseurs:
 *   get:
 *     summary: Obtenir toutes les factures fournisseurs
 *     tags: [FactureFournisseur]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page courante (pagination)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Nombre d’éléments par page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Recherche par numéro de facture
 *     responses:
 *       200:
 *         description: Liste paginée des factures
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
 *                     $ref: '#/components/schemas/FactureFournisseur'
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
 * /facture_fournisseurs/{id}:
 *   get:
 *     summary: Obtenir une facture fournisseur par ID
 *     tags: [FactureFournisseur]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la facture
 *     responses:
 *       200:
 *         description: Facture trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FactureFournisseur'
 *       404:
 *         description: Facture non trouvée
 */

/**
 * @swagger
 * /facture_fournisseurs/{id}:
 *   put:
 *     summary: Modifier une facture fournisseur existante
 *     tags: [FactureFournisseur]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la facture
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FactureFournisseur'
 *     responses:
 *       200:
 *         description: Facture mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FactureFournisseur'
 *       404:
 *         description: Facture non trouvée
 */

/**
 * @swagger
 * /facture_fournisseurs/{id}:
 *   delete:
 *     summary: Supprimer une facture fournisseur
 *     tags: [FactureFournisseur]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la facture
 *     responses:
 *       200:
 *         description: Facture supprimée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Facture supprimée avec succès
 *       404:
 *         description: Facture non trouvée
 */


const express = require('express');
const router = express.Router();
const controller = require('../controllers/facture_fournisseur.controller');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, controller.creerFacture);
router.get('/', authMiddleware, controller.getFactures);
router.get('/:id', authMiddleware, controller.getFactureById);
router.put('/:id', authMiddleware, controller.updateFacture);
router.delete('/:id', authMiddleware, controller.deleteFacture);

module.exports = router;