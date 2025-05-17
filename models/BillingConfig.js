// models/BillingConfig.js
const mongoose = require('mongoose');

const billingConfigSchema = new mongoose.Schema({
  tvaTaux: { type: Number, required: true },
  mentionsLegales: { type: String },
  delaiPaiementJours: { type: Number, default: 30 }
}, { timestamps: true });

module.exports = mongoose.model('BillingConfig', billingConfigSchema);
