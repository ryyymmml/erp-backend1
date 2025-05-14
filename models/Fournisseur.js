// models/Fournisseur.js
const mongoose = require('mongoose');

const fournisseurSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  contact: { type: String, required: true },  // Peut être un email, un téléphone, ou autre
  adresse: { type: String },
  historique: { type: String },  // Historique des transactions, relations
  email: { type: String },
  téléphone: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Fournisseur', fournisseurSchema);
