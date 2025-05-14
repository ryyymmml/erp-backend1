
const Lettrage = require('../models/Lettrage');

// Créer un lettrage
exports.createLettrage = async (req, res) => {
  try {
    const lettrage = new Lettrage(req.body);
    await lettrage.save();
    res.status(201).json({ success: true, data: lettrage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Récupérer tous les lettrages
exports.getLettrages = async (req, res) => {
  try {
    const lettrages = await Lettrage.find().populate('factureId').populate('paiementId');
    res.status(200).json({ success: true, data: lettrages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
