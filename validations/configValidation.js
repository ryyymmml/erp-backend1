const Joi = require('joi');

const configSchema = Joi.object({
  banque: Joi.object({
    nom: Joi.string().required(),
    iban: Joi.string().required(),
    swift: Joi.string().required()
  }).required(),
  facturation: Joi.object({
    tva: Joi.number().min(0).required(),
    delaiPaiementJours: Joi.number().integer().min(0).required(),
    mentionsLegales: Joi.string().allow('', null)
  }).required()
});

const validateConfig = (req, res, next) => {
  const { error } = configSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ success: false, errors: error.details.map(d => d.message) });
  }
  next();
};

module.exports = {
  validateConfig
};
