const StockMovement = require('../models/StockMovement');

exports.addStockMovement = async (movementData) => {
  try {
    const stockMovement = new StockMovement(movementData);
    await stockMovement.save();
    return stockMovement;
  } catch (error) {
    throw new Error('Error adding stock movement: ' + error.message);
  }
};

exports.getStockMovements = async (req, res) => {
  try {
    const { articleId, movementType, startDate, endDate, page = 1, limit = 20 } = req.query;
    const query = {};

    if (articleId) {
      query.articleId = articleId;
    }
    if (movementType) {
      query.movementType = movementType;
    }
    if (startDate || endDate) {
      query.date = {};
      if (startDate) {
        query.date.$gte = new Date(startDate);
      }
      if (endDate) {
        query.date.$lte = new Date(endDate);
      }
    }

    const stockMovements = await StockMovement.find(query)
      .populate('articleId')
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await StockMovement.countDocuments(query);

    res.status(200).json({
      data: stockMovements,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
