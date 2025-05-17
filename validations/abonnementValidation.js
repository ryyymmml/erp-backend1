const Joi = require('joi');

const abonnementSchema = Joi.object({
  nom: Joi.string().required(),
  description: Joi.string().allow('', null),
  prix: Joi.number().required(),
  dureeMois: Joi.number().integer().min(1).required(),
  statut: Joi.string().valid('actif', 'inactif').default('actif')
});

module.exports = {
  abonnementSchema
};
