const mongoose = require('mongoose');

const congeSchema = new mongoose.Schema({
  employe: { type: mongoose.Schema.Types.ObjectId, ref: 'Employe', required: true },
  type: { type: String, enum: ['annuel', 'maladie', 'sans solde'], required: true },
  dateDebut: { type: Date, required: true },
  dateFin: { type: Date, required: true },
  statut: { type: String, enum: ['en attente', 'approuvé', 'rejeté'], default: 'en attente' },
  commentaire: { type: String }
});

module.exports = mongoose.model('Conge', congeSchema);
