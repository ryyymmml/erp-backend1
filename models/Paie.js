const mongoose = require('mongoose');

const paieSchema = new mongoose.Schema({
  employe: { type: mongoose.Schema.Types.ObjectId, ref: 'Employe', required: true },
  mois: { type: String, required: true }, // ex : "04-2025"
  salaireBrut: { type: Number, required: true },
  primes: { type: Number, default: 0 },
  retenues: { type: Number, default: 0 },
  salaireNet: { type: Number, required: true },
  datePaie: { type: Date, default: Date.now },
  statut: { type: String, enum: ['versé', 'en attente'], default: 'versé' }
});

module.exports = mongoose.model('Paie', paieSchema);
