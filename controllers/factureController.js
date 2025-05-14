const Facture = require('../models/Facture');
const pdfController = require('./pdfController');
const stockMovementController = require('./stockMovementController');

exports.createInvoice = async (req, res) => {
  try {
    const invoiceData = req.body;

    // Validation des données requises
    if (!invoiceData.client) {
      return res.status(400).json({ success: false, error: "Le client est requis" });
    }

    if (!invoiceData.lignes || !Array.isArray(invoiceData.lignes) || invoiceData.lignes.length === 0) {
      return res.status(400).json({ success: false, error: "Au moins une ligne de facture est requise" });
    }

    // Validation des lignes de facture
    for (const ligne of invoiceData.lignes) {
      if (!ligne.article || !ligne.quantite || !ligne.prixUnitaire) {
        return res.status(400).json({ 
          success: false, 
          error: "Chaque ligne doit contenir article, quantite et prixUnitaire" 
        });
      }
    }

    // Génération du numéro de facture
    const prefix = invoiceData.type === 'quote' ? 'DEV-' : 'INV-';
    const numero = prefix + Date.now();
    
    // Calcul des totaux
    const totalHT = invoiceData.lignes.reduce((sum, ligne) => {
      return sum + (ligne.quantite * ligne.prixUnitaire);
    }, 0);

    const tvaRate = invoiceData.tvaRate || 20;
    const totalTTC = totalHT + (totalHT * tvaRate / 100);

    // Création de la facture
    const facture = new Facture({
      numero,
      client: invoiceData.client,
      type: invoiceData.type || 'invoice',
      lignes: invoiceData.lignes,
      totalHT,
      tvaRate,
      totalTTC,
      purchaseOrderId: invoiceData.purchaseOrderId,
      status: 'en attente',
    });

    await facture.save();

    // Log stock movement for sales (only if invoice, not quote)
    if (facture.type === 'invoice') {
      for (const ligne of facture.lignes) {
        await stockMovementController.addStockMovement({
          articleId: ligne.article,
          quantityChange: -ligne.quantite,
          movementType: 'sale',
          relatedDocumentId: facture._id,
          relatedDocumentModel: 'Facture',
        });
      }
    }

    return res.status(201).json({ success: true, data: facture });

  } catch (error) {
    console.error("Erreur création facture:", error);
    return res.status(500).json({ 
      success: false, 
      error: 'Erreur serveur lors de la création de la facture',
      details: error.message 
    });
  }
};

exports.getInvoices = async (req, res) => {
  try {
    const type = req.query.type; // 'invoice' or 'quote' or undefined for all
    let query = {};
    
    if (type) {
      query.type = type;
    }

    const factures = await Facture.find(query)
      .populate('client')
      .populate('lignes.article')
      .sort({ dateFacturation: -1 }); // Tri par date décroissante

    return res.status(200).json({ success: true, data: factures });

  } catch (error) {
    console.error("Erreur récupération factures:", error);
    return res.status(500).json({ 
      success: false, 
      error: 'Erreur serveur lors de la récupération des factures' 
    });
  }
};

exports.getInvoiceById = async (req, res) => {
  try {
    const facture = await Facture.findById(req.params.id)
      .populate('client')
      .populate('lignes.article');

    if (!facture) {
      return res.status(404).json({ 
        success: false, 
        error: 'Facture non trouvée' 
      });
    }

    return res.status(200).json({ success: true, data: facture });

  } catch (error) {
    console.error("Erreur récupération facture:", error);
    return res.status(500).json({ 
      success: false, 
      error: 'Erreur serveur lors de la récupération de la facture' 
    });
  }
};

exports.printInvoice = async (req, res) => {
  try {
    const facture = await Facture.findById(req.params.id)
      .populate('client')
      .populate('lignes.article');

    if (!facture) {
      return res.status(404).json({ 
        success: false, 
        error: 'Facture non trouvée' 
      });
    }

    await pdfController.generateFacturePDFWithQRCode(facture, res);

  } catch (error) {
    console.error("Erreur génération PDF:", error);
    return res.status(500).json({ 
      success: false, 
      error: 'Erreur serveur lors de la génération du PDF' 
    });
  }
};

// Note: J'ai remarqué que vous aviez des doublons de getInvoices et getInvoiceById
// dans votre code original. Je les ai supprimés dans cette version corrigée.