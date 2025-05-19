const express = require('express');
const router = express.Router();
const employeController = require('../controllers/employe.controller');

router.post('/', employeController.ajouterEmploye);
router.get('/', employeController.getEmployes);
router.put('/:id', employeController.updateEmploye);
router.delete('/:id', employeController.deleteEmploye);

module.exports = router;
