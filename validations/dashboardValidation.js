const Joi = require('joi');

const dashboardQuerySchema = Joi.object({
  from: Joi.date().iso().optional(),
  to: Joi.date().iso().optional(),
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).optional()
});

const validateDashboardQuery = (req, res, next) => {
  const { error } = dashboardQuerySchema.validate(req.query, { abortEarly: false });
  if (error) {
    return res.status(400).json({ success: false, errors: error.details.map(d => d.message) });
  }
  next();
};

module.exports = {
  validateDashboardQuery
};
