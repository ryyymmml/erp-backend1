const express = require('express');
const router = express.Router();
const congeController = require('../controllers/conge.controller');

router.post('/', congeController.demanderConge);
router.get('/', congeController.getConges);
router.put('/:id', congeController.updateStatut);

module.exports = router;
