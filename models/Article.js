const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  designation: { type: String, required: true },
  famille: { type: String },
  prixAchat: { type: Number },
  prixVente: { type: Number },
  stock: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);
