const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Route to generate bilan financier report
router.get('/bilan/pdf', reportController.generateBilanFinancier);

// Route to generate compte de résultat report
router.get('/compte-resultat/pdf', reportController.generateCompteResultat);

// Route to generate balance âgée report
router.get('/balance-agee/pdf', reportController.generateBalanceAgee);

// Route to generate journal des écritures report
router.get('/journal-ecritures/pdf', reportController.generateJournalEcritures);

// Route to generate rapport de taxes report
router.get('/rapport-taxes/pdf', reportController.generateRapportTaxes);

module.exports = router;
