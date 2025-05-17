const express = require('express');
const router = express.Router();
const { getDashboard, getFacturesMensuelles, getClientsParType, getRevenusVsDepenses } = require('../controllers/dashboardController');

router.get('/', getDashboard);
router.get('/factures-mensuelles', getFacturesMensuelles);
router.get('/clients-par-type', getClientsParType);
router.get('/revenus-vs-depenses', getRevenusVsDepenses);

module.exports = router;
