// routes/fournisseurRoutes.js
const express = require('express');
const router = express.Router();
const fournisseurController = require('../controllers/fournisseurController');

// Route pour créer un fournisseur
router.post('/', fournisseurController.createFournisseur);

// Route pour obtenir tous les fournisseurs
router.get('/', fournisseurController.getFournisseurs);

// Route pour mettre à jour un fournisseur
router.put('/:id', fournisseurController.updateFournisseur);

// Route pour supprimer un fournisseur
router.delete('/:id', fournisseurController.deleteFournisseur);

module.exports = router;
