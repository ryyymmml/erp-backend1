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