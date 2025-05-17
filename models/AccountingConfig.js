// models/AccountingConfig.js
const mongoose = require('mongoose');

const accountingConfigSchema = new mongoose.Schema({
  compteVente: { type: String, required: true },
  compteAchat: { type: String, required: true },
  compteBancaire: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('AccountingConfig', accountingConfigSchema);
