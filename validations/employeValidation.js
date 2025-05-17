const Joi = require('joi');

const employeSchema = Joi.object({
  nom: Joi.string().required(),
  prenom: Joi.string().required(),
  email: Joi.string().email().required(),
  telephone: Joi.string().allow('', null),
  poste: Joi.string().allow('', null),
  dateEmbauche: Joi.date().optional(),
  salaire: Joi.number().optional(),
  statut: Joi.string().valid('actif', 'suspendu', 'démissionné').default('actif')
});

module.exports = {
  employeSchema
};
