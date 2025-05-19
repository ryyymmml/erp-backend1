// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Affiche l'erreur dans la console (dev)

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Erreur serveur',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

module.exports = errorHandler;
