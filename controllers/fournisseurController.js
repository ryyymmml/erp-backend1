const Fournisseur = require('../models/Fournisseur');
const { fournisseurSchema } = require('../validations/fournisseurValidation');

// Create fournisseur
exports.createFournisseur = async (req, res, next) => {
  try {
    const { error } = fournisseurSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const fournisseur = new Fournisseur(req.body);
    const savedFournisseur = await fournisseur.save();
    res.status(201).json(savedFournisseur);
  } catch (err) {
    next(err);
  }
};

// Get fournisseurs with pagination and filter by nom
exports.getFournisseurs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const searchNom = req.query.searchNom || "";

    const skip = (page - 1) * limit;

    const query = {};
    if (searchNom) {
      query.nom = { $regex: searchNom, $options: 'i' };
    }

    const total = await Fournisseur.countDocuments(query);
    const fournisseurs = await Fournisseur.find(query).skip(skip).limit(limit);

    res.json({
      success: true,
      data: fournisseurs,
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

// Update fournisseur
exports.updateFournisseur = async (req, res, next) => {
  try {
    const { error } = fournisseurSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const updatedFournisseur = await Fournisseur.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedFournisseur);
  } catch (err) {
    next(err);
  }
};

// Delete fournisseur
exports.deleteFournisseur = async (req, res, next) => {
  try {
    await Fournisseur.findByIdAndDelete(req.params.id);
    res.json({ message: 'Fournisseur supprimé avec succès' });
  } catch (err) {
    next(err);
  }
};
