const Facture = require('../models/Facture');
const Paiement = require('../models/Paiement');

exports.getDashboard = async (req, res, next) => {
  try {
    const totalFactures = await Facture.aggregate([
      { $group: { _id: null, total: { $sum: '$montantTotal' } } }
    ]);
    const totalPaiements = await Paiement.aggregate([
      { $group: { _id: null, total: { $sum: '$montant' } } }
    ]);
    const totalClients = await Facture.distinct('clientId');

    const dashboardData = {
      totalFactures: totalFactures[0]?.total || 0,
      totalPaiements: totalPaiements[0]?.total || 0,
      totalClients: totalClients.length,
      solde: (totalFactures[0]?.total || 0) - (totalPaiements[0]?.total || 0)
    };

    res.json({ success: true, data: dashboardData });
  } catch (error) {
    next(error);
  }
};

exports.getFacturesMensuelles = async (req, res, next) => {
  try {
    const facturesMensuelles = await Facture.aggregate([
      {
        $group: {
          _id: { $month: '$dateFacture' },
          totalMontant: { $sum: '$total' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id': 1 } }
    ]);
    res.json({ success: true, data: facturesMensuelles });
  } catch (error) {
    next(error);
  }
};

exports.getClientsParType = async (req, res, next) => {
  try {
    // Assuming Client model has a 'type' field
    const Client = require('../models/Client');
    const clientsParType = await Client.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      }
    ]);
    res.json({ success: true, data: clientsParType });
  } catch (error) {
    next(error);
  }
};

exports.getRevenusVsDepenses = async (req, res, next) => {
  try {
    // Revenus from Facture total
    const revenus = await Facture.aggregate([
      {
        $group: {
          _id: null,
          totalRevenus: { $sum: '$total' }
        }
      }
    ]);
    // Dépenses from Paiement total
    const depenses = await Paiement.aggregate([
      {
        $group: {
          _id: null,
          totalDepenses: { $sum: '$montant' }
        }
      }
    ]);
    res.json({
      success: true,
      data: {
        revenus: revenus[0]?.totalRevenus || 0,
        depenses: depenses[0]?.totalDepenses || 0
      }
    });
  } catch (error) {
    next(error);
  }
};
