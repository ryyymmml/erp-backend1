const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ERP Backend API',
      version: '1.0.0',
      description: 'API documentation for the ERP backend system',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Local server',
      },
    ],
  },
  apis: ['./Routes/*.js'], // files containing annotations for the Swagger docs
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
