const EcritureComptable = require('../models/EcritureComptable');
const Facture = require('../models/Facture');
const Avoir = require('../models/Avoir');

// Créer une écriture
exports.createEcriture = async (req, res) => {
  try {
    const { factureId, avoirId, description } = req.body;

    let totalHT = 0;
    let tvaRate = 0;
    let totalTTC = 0;

    if (factureId) {
      const facture = await Facture.findById(factureId);
      if (facture) {
        totalHT = facture.totalHT;
        tvaRate = facture.tvaRate;
        totalTTC = facture.totalTTC;
      }
    } else if (avoirId) {
      const avoir = await Avoir.findById(avoirId);
      if (avoir) {
        totalHT = avoir.totalHT;
        tvaRate = avoir.tvaRate;
        totalTTC = avoir.totalTTC;
      }
    } else {
      return res.status(400).json({ success: false, message: 'factureId or avoirId is required' });
    }

    const ecritureData = {
      description,
      totalHT,
      tvaRate,
      totalTTC
    };

    const ecriture = new EcritureComptable(ecritureData);
    await ecriture.save();
    res.status(201).json({ success: true, data: ecriture });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Récupérer toutes les écritures
exports.getEcritures = async (req, res) => {
  try {
    const ecritures = await EcritureComptable.find();
    res.status(200).json({ success: true, data: ecritures });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
