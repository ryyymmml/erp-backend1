const Joi = require('joi');

const fournisseurSchema = Joi.object({
  nom: Joi.string().required(),
  contact: Joi.string().required(),
  adresse: Joi.string().allow('', null),
  historique: Joi.string().allow('', null),
  email: Joi.string().email().allow('', null),
  téléphone: Joi.string().allow('', null)
});

module.exports = {
  fournisseurSchema
};
