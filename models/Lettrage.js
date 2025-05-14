const mongoose = require('mongoose');

const lettrageSchema = new mongoose.Schema({
  factureId: { type: mongoose.Schema.Types.ObjectId, ref: 'Facture', required: true },
  paiementId: { type: mongoose.Schema.Types.ObjectId, ref: 'Paiement', required: true },
  montantLettre: { type: Number, required: true },
  dateLettrage: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lettrage', lettrageSchema);
