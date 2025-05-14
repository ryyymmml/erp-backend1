const { query, validationResult } = require('express-validator');

exports.validateStockMovementQuery = [
  query('articleId').optional().isMongoId().withMessage('Invalid articleId'),
  query('movementType').optional().isIn(['purchase', 'sale', 'adjustment']).withMessage('Invalid movementType'),
  query('startDate').optional().isISO8601().toDate().withMessage('Invalid startDate'),
  query('endDate').optional().isISO8601().toDate().withMessage('Invalid endDate'),
  query('page').optional().isInt({ min: 1 }).toInt().withMessage('Invalid page number'),
  query('limit').optional().isInt({ min: 1 }).toInt().withMessage('Invalid limit number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
