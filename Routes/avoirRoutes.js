const express = require('express');
const router = express.Router();
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const { validateAvoir } = require('../validations/avoirValidation');
const { createAvoir, getAvoirs } = require('../controllers/avoirController');

router.use(authMiddleware);

router.post('/', validateAvoir, isAdmin, createAvoir);
router.get('/', getAvoirs);

module.exports = router;
