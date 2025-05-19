const Conge = require('../models/Conge');
const { congeSchema } = require('../validations/congeValidation');

exports.demanderConge = async (req, res) => {
  try {
    const { error } = congeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const conge = new Conge(req.body);
    await conge.save();
    res.status(201).json(conge);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getConges = async (req, res) => {
  try {
    const conges = await Conge.find().populate('employe');
    res.status(200).json(conges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStatut = async (req, res) => {
  try {
    const conge = await Conge.findByIdAndUpdate(req.params.id, { statut: req.body.statut }, { new: true });
    res.status(200).json(conge);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.mettreAJourConge = async (req, res) => {
  try {
    const { error } = congeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const updatedConge = await Conge.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedConge);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
