const Joi = require('joi');

const congeSchema = Joi.object({
  employe: Joi.string().required(),
  type: Joi.string().valid('annuel', 'maladie', 'sans solde').required(),
  dateDebut: Joi.date().required(),
  dateFin: Joi.date().required(),
  statut: Joi.string().valid('en attente', 'approuvé', 'rejeté').default('en attente'),
  commentaire: Joi.string().allow('', null)
});

module.exports = {
  congeSchema
};
