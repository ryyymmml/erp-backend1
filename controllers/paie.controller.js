const Paie = require('../models/Paie');

exports.creerBulletin = async (req, res) => {
  try {
    const { salaireBrut, primes, retenues } = req.body;
    const salaireNet = salaireBrut + (primes || 0) - (retenues || 0);

    const bulletin = new Paie({ ...req.body, salaireNet });
    await bulletin.save();
    res.status(201).json(bulletin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBulletins = async (req, res) => {
  try {
    const bulletins = await Paie.find().populate('employe');
    res.status(200).json(bulletins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBulletinsByEmploye = async (req, res) => {
  try {
    const bulletins = await Paie.find({ employe: req.params.id }).populate('employe');
    res.status(200).json(bulletins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
