const { body, validationResult } = require('express-validator');
const Client = require('../models/Client');
const Facture = require('../models/Facture');

exports.validateAvoir = [
  body('clientId')
    .isMongoId().withMessage('clientId invalide')
    .bail()
    .custom(async id => {
      const client = await Client.findById(id);
      if (!client) throw new Error('Client non trouvé');
    }),
  body('montant')
    .isFloat({ gt: 0 }).withMessage('Le montant doit être supérieur à 0'),
  body('factureId')
    .optional()
    .isMongoId().withMessage('factureId invalide')
    .bail()
    .custom(async id => {
      const facture = await Facture.findById(id);
      if (!facture) throw new Error('Facture non trouvée');
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  }
];
