const Employe = require('../models/Employe');
const { employeSchema } = require('../validations/employeValidation');

exports.ajouterEmploye = async (req, res, next) => {
  try {
    const { error } = employeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const employe = new Employe(req.body);
    await employe.save();
    res.status(201).json(employe);
  } catch (err) {
    next(err);
  }
};

// Get employes with pagination and filter by nom or poste
exports.getEmployes = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const searchNom = req.query.searchNom || "";
    const searchPoste = req.query.searchPoste || "";

    const skip = (page - 1) * limit;

    const query = {};
    if (searchNom) {
      query.nom = { $regex: searchNom, $options: 'i' };
    }
    if (searchPoste) {
      query.poste = { $regex: searchPoste, $options: 'i' };
    }

    const total = await Employe.countDocuments(query);
    const employes = await Employe.find(query).skip(skip).limit(limit);

    res.json({
      success: true,
      data: employes,
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

exports.updateEmploye = async (req, res, next) => {
  try {
    const { error } = employeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const employe = await Employe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(employe);
  } catch (err) {
    next(err);
  }
};

exports.deleteEmploye = async (req, res, next) => {
  try {
    await Employe.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
