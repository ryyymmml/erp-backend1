const Joi = require('joi');

const reportQuerySchema = Joi.object({
  from: Joi.date().iso().optional(),
  to: Joi.date().iso().optional()
});

const validateReportQuery = (req, res, next) => {
  const { error } = reportQuerySchema.validate(req.query, { abortEarly: false });
  if (error) {
    return res.status(400).json({ success: false, errors: error.details.map(d => d.message) });
  }
  next();
};

module.exports = {
  validateReportQuery
};
