const mongoose = require('mongoose');

const ecritureComptableSchema = new mongoose.Schema({
  dateEcriture: { type: Date, required: true },
  description: { type: String, required: true },
  compteDebit: { type: String, required: true },
  compteCredit: { type: String, required: true },
  montant: { type: Number, required: true },
  journal: { type: String, required: true }, // Ex : Banque, Ventes, Achats
}, {
  timestamps: true
});

module.exports = mongoose.model('EcritureComptable', ecritureComptableSchema);
