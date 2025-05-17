const express = require('express');
const router = express.Router();
const paiementController = require('../controllers/paiement.controller');

router.post('/', paiementController.creerPaiement);
router.get('/', paiementController.getPaiements);
router.delete('/:id', paiementController.deletePaiement);

module.exports = router;
