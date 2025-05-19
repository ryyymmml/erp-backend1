const Joi = require('joi');

const ligneSchema = Joi.object({
  article: Joi.string().required(),
  quantite: Joi.number().min(1).required(),
  prixUnitaire: Joi.number().min(0).required(),
  description: Joi.string().optional()
});

const factureSchema1 = Joi.object({
   numero: Joi.number(),
  fournisseur: Joi.string().required(),
  type: Joi.string().valid('invoice', 'quote').default('invoice'),
  lignes: Joi.array().items(ligneSchema).min(1).required(),
  tvaRate: Joi.number().min(0).max(100).default(20),
  status: Joi.string().valid('en attente', 'payée', 'annulée').default('en attente'),
  purchaseOrderId: Joi.string().optional(),
  dateFacturation: Joi.date().optional()
});

module.exports = { factureSchema1 };