const mongoose = require('mongoose');

const employeSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telephone: { type: String },
  poste: { type: String }, // Ex: Développeur, RH, DG...
  dateEmbauche: { type: Date, default: Date.now },
  salaire: { type: Number },
  statut: { type: String, enum: ['actif', 'suspendu', 'démissionné'], default: 'actif' }
});

module.exports = mongoose.model('Employe', employeSchema);
