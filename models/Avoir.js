const mongoose = require('mongoose');

const AvoirSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  totalHT: { type: Number, required: true },
  tvaRate: { type: Number, required: true },
  totalTTC: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  factureId: { type: mongoose.Schema.Types.ObjectId, ref: 'Facture' },
  description: { type: String }
});

module.exports = mongoose.model('Avoir', AvoirSchema);
