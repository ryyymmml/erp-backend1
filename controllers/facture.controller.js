const Facture = require('../models/Facture');
const { factureSchema } = require('../validations/factureValidation');

exports.creerFacture = async (req, res, next) => {
  try {
    const { error } = factureSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Calculate totalHT
    const totalHT = req.body.lignes.reduce((sum, ligne) => {
      return sum + (ligne.quantite * ligne.prixUnitaire);
    }, 0);

    // Use provided tvaRate or default to 20%
    const tvaRate = req.body.tvaRate !== undefined ? req.body.tvaRate : 20;

    // Calculate totalTTC
    const totalTTC = totalHT * (1 + tvaRate / 100);

    const factureData = {
      ...req.body,
      totalHT,
      tvaRate,
      totalTTC
    };

    const facture = new Facture(factureData);
    await facture.save();
    res.status(201).json(facture);
  } catch (err) {
    next(err);
  }
};

exports.getFactures = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const skip = (page - 1) * limit;

    const query = {};
    if (search) {
      query.numero = { $regex: search, $options: 'i' };
    }

    const total = await Facture.countDocuments(query);
    const factures = await Facture.find(query)
      .populate('client')
      .populate('lignes.article')
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      data: factures,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.mettreAJourFacture = async (req, res, next) => {
  try {
    const { error } = factureSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Calculate totalHT
    const totalHT = req.body.lignes.reduce((sum, ligne) => {
      return sum + (ligne.quantite * ligne.prixUnitaire);
    }, 0);

    // Use provided tvaRate or default to 20%
    const tvaRate = req.body.tvaRate !== undefined ? req.body.tvaRate : 20;

    // Calculate totalTTC
    const totalTTC = totalHT * (1 + tvaRate / 100);

    const factureData = {
      ...req.body,
      totalHT,
      tvaRate,
      totalTTC
    };

    const updatedFacture = await Facture.findByIdAndUpdate(req.params.id, factureData, { new: true });
    res.json(updatedFacture);
  } catch (err) {
    next(err);
  }
};
