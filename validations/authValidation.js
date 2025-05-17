const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  motDePasse: Joi.string().min(6).required()
});

const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ success: false, errors: error.details.map(d => d.message) });
  }
  next();
};

module.exports = {
  validateLogin
};
