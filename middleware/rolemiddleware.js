// middlewares/roleMiddleware.js
const roleHierarchy = ['utilisateur', 'rh', 'admin'];

const hasRoleOrAbove = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ success: false, message: 'Accès refusé : rôle non trouvé' });
    }

    const userRole = req.user.role;
    const userLevel = roleHierarchy.indexOf(userRole);
    const requiredLevel = roleHierarchy.indexOf(requiredRole);

    if (userLevel >= requiredLevel) {
      return next();
    } else {
      return res.status(403).json({ success: false, message: 'Accès refusé : rôle insuffisant' });
    }
  };
};

module.exports = { hasRoleOrAbove };