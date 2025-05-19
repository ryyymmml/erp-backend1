const mongoose = require('mongoose');

const purchaseClientSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
      quantity: { type: Number },
      price: { type: Number },
      total: { type: Number },  // Calculé sur quantity * price
    },
  ],
  totalAmount: { type: Number },
  status: { type: String, enum: ['en attente', 'confirmée', 'livrée', 'annulée'], default: 'en attente' },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('PurchaseClient',purchaseClientSchema);
