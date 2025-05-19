const FactureFournisseur = require('../models/FactureFournisseur');

const { factureSchema1 } = require('../validations/facture_fournisseurvalidation');

exports.creerFacture = async (req, res, next) => {
  try {
    const { error } = factureSchema1.validate(req.body);
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

    // Correction - utilisez FactureFournisseur au lieu de Facture
    const facture = new FactureFournisseur(factureData);
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
      query.numero = { $regex: search, $options: 'i' }; // Recherche par numéro de facture (insensible à la casse)
    }

    // Correction : Utilisation de FactureFournisseur au lieu de Facture
    const total = await FactureFournisseur.countDocuments(query);
    const factures = await FactureFournisseur.find(query)
      .populate('fournisseur')  // Correction : 'fournisseur' au lieu de 'client'
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

exports.getFactureById = async (req, res, next) => {
  try {
    const facture = await FactureFournisseur.findById(req.params.id)
      .populate('fournisseur')
      .populate('lignes.article');
    if (!facture) {
      return res.status(404).json({ error: 'Facture non trouvée' });
    }
    res.status(200).json(facture);
  } catch (err) {
    next(err);
  }
};

exports.updateFacture = async (req, res, next) => {
  try {
    const updatedFacture = await FactureFournisseur.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    if (!updatedFacture) {
      return res.status(404).json({ error: 'Facture non trouvée' });
    }
    res.status(200).json(updatedFacture);
  } catch (err) {
    next(err);
  }
};

exports.deleteFacture = async (req, res, next) => {
  try {
    const deletedFacture = await FactureFournisseur.findByIdAndDelete(req.params.id);
    if (!deletedFacture) {
      return res.status(404).json({ error: 'Facture non trouvée' });
    }
    res.status(200).json({ message: 'Facture supprimée avec succès' });
  } catch (err) {
    next(err);
  }
};