const mongoose = require('mongoose');

const stockMovementSchema = new mongoose.Schema({
  articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
  quantityChange: { type: Number, required: true },
  movementType: { type: String, enum: ['purchase', 'sale', 'adjustment'], required: true },
  date: { type: Date, default: Date.now },
  relatedDocumentId: { type: mongoose.Schema.Types.ObjectId, refPath: 'relatedDocumentModel' },
  relatedDocumentModel: { type: String, enum: ['PurchaseOrder', 'Facture'] },
});

module.exports = mongoose.model('StockMovement', stockMovementSchema);
