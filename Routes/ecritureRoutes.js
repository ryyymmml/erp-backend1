const express = require('express');
const router = express.Router();
const ecritureController = require('../controllers/ecritureController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, isAdmin, ecritureController.createEcriture);
router.get('/', authMiddleware, ecritureController.getEcritures);

module.exports = router;
