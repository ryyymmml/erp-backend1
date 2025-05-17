const Joi = require('joi');

const paiementSchema = Joi.object({
  facture: Joi.string().required(),
  client: Joi.string().required(),
  datePaiement: Joi.date().optional(),
  montant: Joi.number().required(),
  moyen: Joi.string().valid('espèce', 'chèque', 'virement', 'carte bancaire').required(),
  statut: Joi.string().valid('réussi', 'échoué', 'en attente').default('réussi')
});

module.exports = {
  paiementSchema
};
