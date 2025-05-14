const Joi = require('joi');

const ligneSchema = Joi.object({
  article: Joi.string().required(),
  quantite: Joi.number().required(),
  prixUnitaire: Joi.number().required()
});

const factureSchema = Joi.object({
  client: Joi.string().required(),
  dateFacture: Joi.date().optional(),
  lignes: Joi.array().items(ligneSchema).min(1).required(),
  total: Joi.number().required(),
  statut: Joi.string().valid('payée', 'en attente', 'annulée').default('en attente')
});

module.exports = {
  factureSchema
};
