const mongoose = require('mongoose');

const purchaseOrderSchema = new mongoose.Schema({
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Fournisseur' },
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

module.exports = mongoose.model('PurchaseOrder', purchaseOrderSchema);
