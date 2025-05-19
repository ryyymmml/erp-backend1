const Facture = require('../models/Facture');
const Paiement = require('../models/Paiement');
const ExcelJS = require('exceljs');

exports.generateBilanFinancier = async (req, res, next) => {
  try {
    const totalFactures = await Facture.aggregate([
      { $group: { _id: null, total: { $sum: '$totalTTC' } } }
    ]);
    const totalPaiements = await Paiement.aggregate([
      { $group: { _id: null, total: { $sum: '$montant' } } }
    ]);

    const bilan = {
      totalFactures: totalFactures[0]?.total || 0,
      totalPaiements: totalPaiements[0]?.total || 0,
      solde: (totalFactures[0]?.total || 0) - (totalPaiements[0]?.total || 0)
    };

    res.json({ success: true, data: bilan });
  } catch (error) {
    next(error);
  }
};

exports.exportFacturesExcel = async (req, res, next) => {
  try {
    const factures = await Facture.find().populate('clientId');

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Factures');

    worksheet.columns = [
      { header: 'Numéro de facture', key: 'numero', width: 20 },
      { header: 'Client', key: 'clientNom', width: 30 },
      { header: 'Total HT', key: 'totalHT', width: 15 },
      { header: 'TVA (%)', key: 'tvaRate', width: 10 },
      { header: 'Total TTC', key: 'totalTTC', width: 15 },
      { header: 'Date', key: 'dateFacture', width: 20 }
    ];

    factures.forEach((facture) => {
      worksheet.addRow({
        numero: facture.numero,
        clientNom: facture.clientId.nom,
        totalHT: facture.totalHT,
        tvaRate: facture.tvaRate,
        totalTTC: facture.totalTTC,
        dateFacture: facture.dateFacture
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=factures.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    next(error);
  }
};

exports.exportFacturesJSON = async (req, res, next) => {
  try {
    const factures = await Facture.find().populate('clientId');

    const facturesData = factures.map(facture => ({
      numero: facture.numero,
      clientNom: facture.clientId.nom,
      totalHT: facture.totalHT,
      tvaRate: facture.tvaRate,
      totalTTC: facture.totalTTC,
      dateFacture: facture.dateFacture
    }));

    res.json({ success: true, data: facturesData });
  } catch (error) {
    next(error);
  }
};

exports.generateCompteResultat = async (req, res, next) => {
  try {
    // Stub implementation
    res.json({ success: true, message: 'generateCompteResultat stub response' });
  } catch (error) {
    next(error);
  }
};

exports.generateBalanceAgee = async (req, res, next) => {
  try {
    // Stub implementation
    res.json({ success: true, message: 'generateBalanceAgee stub response' });
  } catch (error) {
    next(error);
  }
};

exports.generateJournalEcritures = async (req, res, next) => {
  try {
    // Stub implementation
    res.json({ success: true, message: 'generateJournalEcritures stub response' });
  } catch (error) {
    next(error);
  }
};

exports.generateRapportTaxes = async (req, res, next) => {
  try {
    // Stub implementation
    res.json({ success: true, message: 'generateRapportTaxes stub response' });
  } catch (error) {
    next(error);
  }
};
