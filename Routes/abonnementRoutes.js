// routes/abonnementRoutes.js
const express = require('express');
const router = express.Router();
const abonnementController = require('../controllers/abonnementController');
const { authMiddleware } = require('../middleware/authMiddleware'); // protéger si besoin

// CRUD Abonnements
router.post('/', abonnementController.createAbonnement);
router.get('/',  abonnementController.getAbonnements);
router.put('/:id', abonnementController.updateAbonnement);
router.delete('/:id',  abonnementController.deleteAbonnement);

module.exports = router;
