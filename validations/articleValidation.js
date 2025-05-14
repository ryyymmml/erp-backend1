const Joi = require('joi');

const articleSchema = Joi.object({
  code: Joi.string().required(),
  designation: Joi.string().required(),
  famille: Joi.string().allow('', null),
  prixAchat: Joi.number().allow(null),
  prixVente: Joi.number().allow(null),
  stock: Joi.number().integer().min(0).allow(null)
});

module.exports = {
  articleSchema
};
