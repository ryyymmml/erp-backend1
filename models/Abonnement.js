const mongoose = require('mongoose');

const abonnementSchema = new mongoose.Schema({
  
  nom: { type: String, required: true },
  description: { type: String },
  prix: { type: Number, required: true },
  dureeMois: { type: Number, required: true }, // Durée de l'abonnement en mois
  statut: { type: String, enum: ['actif', 'inactif'], default: 'actif' },
}, {
  timestamps: true // createdAt, updatedAt automatiquement
});

module.exports = mongoose.model('Abonnement', abonnementSchema);
