const jwt = require('jsonwebtoken');
   const JWT_SECRET = 'your_jwt_secret_key';

   const authMiddleware = (req, res, next) => {
     const authHeader = req.headers.authorization;
     if (!authHeader || !authHeader.startsWith('Bearer ')) {
       return next();
     }
     const token = authHeader.split(' ')[1];
     try {
       const decoded = jwt.verify(token, JWT_SECRET);
       req.user = decoded;
       next();
     } catch (err) {
       return res.status(401).json({ error: 'Invalid or expired token' });
     }
   };

   const isAdmin = (req, res, next) => {
     if (!req.user || req.user.role !== 'admin') {
       return res.status(403).json({ success: false, message: 'Accès refusé' });
     }
     next();
   };

   module.exports = {
     authMiddleware,
     isAdmin,
   };