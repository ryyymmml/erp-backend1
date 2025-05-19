const { number } = require('joi');
const mongoose = require('mongoose');

const factureSchema = new mongoose.Schema({
 numero: { type: String, required: false, unique: true },  
 fournisseur: { type: mongoose.Schema.Types.ObjectId, ref: 'Fournisseur', required: true },
  type: { type: String, enum: ['invoice', 'quote'], default: 'invoice' }, // Changed to match frontend
  lignes: [
    {
      article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
      quantite: { type: Number, required: true },
      prixUnitaire: { type: Number, required: true },
      description: String
    },
  ],
  totalHT: { type: Number, required: true },
  tvaRate: { type: Number, default: 20 },
  totalTTC: { type: Number, required: true },
  dateFacturation: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['en attente', 'payée', 'annulée'], 
    default: 'en attente' 
  },
  purchaseOrderId: { type: mongoose.Schema.Types.ObjectId, ref: 'BonDeCommande' }, // Changed field name
}, { timestamps: true });

module.exports = mongoose.model('FactureFournisseur', factureSchema);