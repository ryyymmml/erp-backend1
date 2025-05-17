const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
      quantity: { type: Number },
      price: { type: Number },
      total: { type: Number },  // Calculé sur quantity * price
    },
  ],
  totalAmount: { type: Number },  // Total de la commande
  status: { type: String, enum: ['en attente', 'confirmée', 'expédiée', 'livrée', 'annulée'], default: 'en attente' },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
