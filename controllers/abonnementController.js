const Abonnement = require('../models/Abonnement');
const { abonnementSchema } = require('../validations/abonnementValidation');

// Créer un abonnement
exports.createAbonnement = async (req, res) => {
  try {
    const { error, value } = abonnementSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }
    const abonnement = new Abonnement(value);
    await abonnement.save();
    res.status(201).json({ success: true, data: abonnement });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Récupérer tous les abonnements
exports.getAbonnements = async (req, res) => {
  try {
    const abonnements = await Abonnement.find();
    res.status(200).json({ success: true, data: abonnements });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mettre à jour un abonnement
exports.updateAbonnement = async (req, res) => {
  try {
    const { error, value } = abonnementSchema.validate(req.body);
    if (error) {
      console.log('Validation error:', error.details); // Add this for debugging
      return res.status(400).json({ 
        success: false, 
        message: error.details[0].message 
      });
    }

    const abonnement = await Abonnement.findByIdAndUpdate(
      req.params.id, 
      value, 
      { 
        new: true,
        runValidators: true
      }
    );

    if (!abonnement) {
      return res.status(404).json({ success: false, message: 'Abonnement non trouvé' });
    }

    res.status(200).json({ 
      success: true, 
      data: abonnement,
      message: 'Abonnement updated successfully'
    });
  } catch (error) {
    console.error('Update error:', error); // Add this for debugging
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Supprimer un abonnement
exports.deleteAbonnement = async (req, res) => {
  try {
    const abonnement = await Abonnement.findByIdAndDelete(req.params.id);
    if (!abonnement) return res.status(404).json({ success: false, message: 'Abonnement non trouvé' });
    res.status(200).json({ success: true, message: 'Abonnement supprimé' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
