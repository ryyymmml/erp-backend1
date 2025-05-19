const Joi = require('joi');

const clientSchema = Joi.object({
  clientType: Joi.string().valid('physique', 'moral').required(),
  firstName: Joi.when('clientType', {
    is: 'physique',
    then: Joi.string().required(),
    otherwise: Joi.string().allow('', null)
  }),
  lastName: Joi.when('clientType', {
    is: 'physique',
    then: Joi.string().required(),
    otherwise: Joi.string().allow('', null)
  }),
  companyName: Joi.when('clientType', {
    is: 'moral',
    then: Joi.string().required(),
    otherwise: Joi.string().allow('', null)
  }),
  industry: Joi.string().allow('', null),
  phoneNumber: Joi.string().pattern(/^[0-9+\-\s]+$/).allow('', null),
  emailAddress: Joi.string().email().allow('', null),
  postalAddress: Joi.string().allow('', null),
  interactionHistory: Joi.array().items(Joi.string()).allow(null)
});

module.exports = {
  clientSchema
};
