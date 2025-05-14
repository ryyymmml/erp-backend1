require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/erp',
  jwtSecret: process.env.JWT_SECRET || 'secretKey123',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:4200',
  pdfPath: './exports', // dossier d'export PDF
  environment: process.env.NODE_ENV || 'development'
};
