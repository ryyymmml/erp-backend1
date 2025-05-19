const mongoose = require('mongoose');

const paiementSchema = new mongoose.Schema({
  facture: { type: mongoose.Schema.Types.ObjectId, ref: 'Facture', required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  datePaiement: { type: Date, default: Date.now },
  montant: { type: Number, required: true },
  moyen: { type: String, enum: ['espèce', 'chèque', 'virement', 'carte bancaire'], required: true },
  statut: { type: String, enum: ['réussi', 'échoué', 'en attente'], default: 'réussi' }
});

module.exports = mongoose.model('Paiement', paiementSchema);
