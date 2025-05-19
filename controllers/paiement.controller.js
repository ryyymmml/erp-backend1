const Paiement = require('../models/Paiement');
const Facture = require('../models/Facture');
const { paiementSchema } = require('../validations/paiementValidation');

exports.creerPaiement = async (req, res) => {
  try {
    const { error } = paiementSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const paiement = new Paiement(req.body);
    await paiement.save();

    // (optionnel) Mettre à jour le statut de la facture
    await Facture.findByIdAndUpdate(req.body.facture, { statut: 'payée' });

    res.status(201).json(paiement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPaiements = async (req, res) => {
  try {
    const { client, date } = req.query;
    const filter = {};

    if (client) filter.client = client;
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      filter.datePaiement = { $gte: start, $lte: end };
    }

    const paiements = await Paiement.find(filter)
      .populate('facture')
      .populate('client');

    res.status(200).json(paiements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

  // Update a payment
exports.updatePaiement = async (req, res) => {
  try {
    const { error } = paiementSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const paiement = await Paiement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!paiement) {
      return res.status(404).json({ error: 'Paiement non trouvé' });
    }

    // Optionally update the associated invoice status if the amount changed
    if (req.body.montant) {
      await Facture.findByIdAndUpdate(paiement.facture, { statut: 'payée' });
    }

    res.status(200).json(paiement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a payment
exports.deletePaiement = async (req, res) => {
  try {
    const paiement = await Paiement.findByIdAndDelete(req.params.id);

    if (!paiement) {
      return res.status(404).json({ error: 'Paiement non trouvé' });
    }

    // Optionally update the associated invoice status to 'non payée'
    await Facture.findByIdAndUpdate(paiement.facture, { statut: 'non payée' });

    res.status(200).json({ message: 'Paiement supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single payment by ID
exports.getPaiementById = async (req, res) => {
  try {
    const paiement = await Paiement.findById(req.params.id)
      .populate('facture')
      .populate('client');

    if (!paiement) {
      return res.status(404).json({ error: 'Paiement non trouvé' });
    }

    res.status(200).json(paiement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

 
};
 // Delete all payments
exports.deleteAllPaiements = async (req, res) => {
  try {
    // Optional: Add confirmation parameter for safety
    const { confirm } = req.query;
    
    if (confirm !== 'true') {
      return res.status(400).json({ 
        error: 'Confirmation required. Add ?confirm=true to confirm deletion' 
      });
    }

    // First get all payments to update associated invoices
    const allPaiements = await Paiement.find({});
    
    // Update all associated invoices to 'non payée'
    const factureIds = allPaiements.map(p => p.facture);
    await Facture.updateMany(
      { _id: { $in: factureIds } },
      { statut: 'non payée' }
    );

    // Then delete all payments
    const result = await Paiement.deleteMany({});

    res.status(200).json({
      message: `Successfully deleted ${result.deletedCount} payments`,
      deletedCount: result.deletedCount
    });

  } catch (err) {
    res.status(500).json({ 
      error: err.message,
      message: 'An error occurred while deleting payments' 
    });
  }
};

