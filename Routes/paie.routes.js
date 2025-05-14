const express = require('express');
const router = express.Router();
const paieController = require('../controllers/paie.controller');

router.post('/', paieController.creerBulletin);
router.get('/', paieController.getBulletins);
router.get('/employe/:id', paieController.getBulletinsByEmploye);

module.exports = router;
