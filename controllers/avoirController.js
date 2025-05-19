const Avoir = require('../models/Avoir');
const Client = require('../models/Client');

exports.createAvoir = async (req, res, next) => {
  try {
    const { clientId, lignes, tvaRate, factureId, description } = req.body;

    // Calculate totalHT
    const totalHT = lignes ? lignes.reduce((sum, ligne) => {
      return sum + (ligne.quantite * ligne.prixUnitaire);
    }, 0) : 0;

    // Use provided tvaRate or default to 20%
    const tva = tvaRate !== undefined ? tvaRate : 20;

    // Calculate totalTTC
    const totalTTC = totalHT * (1 + tva / 100);

    const avoirData = {
      clientId,
      totalHT,
      tvaRate: tva,
      totalTTC,
      factureId,
      description
    };

    const avoir = new Avoir(avoirData);
    await avoir.save();
    res.status(201).json({ success: true, data: avoir });
  } catch (error) {
    next(error);
  }
};

exports.getAvoirs = async (req, res, next) => {
  try {
    const avoirs = await Avoir.find().populate('clientId factureId');
    res.status(200).json({ success: true, data: avoirs });
  } catch (error) {
    next(error);
  }
};
