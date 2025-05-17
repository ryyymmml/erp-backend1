const express = require('express');
const router = express.Router();
const lettrageController = require('../controllers/lettrageController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, isAdmin, lettrageController.createLettrage);
router.get('/', authMiddleware, lettrageController.getLettrages);

module.exports = router;
