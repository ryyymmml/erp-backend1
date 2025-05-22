const PurchaseClient = require('../models/purchaseclient'); // Notez le nouveau nom
const Article = require('../models/Article');
const pdfController = require('./pdfController'); // Assuming pdfController has PDF generation utilities

// Créer une commande fournisseur
exports.createPurchaseClient = async (req, res) => {
  try {
    const { clientId, products, status } = req.body; 
    let totalAmount = 0;
    
    // Calculate total amount
    for (const product of products) {
      totalAmount += product.price * product.quantity;
    }

    const newPurchaseClient = new PurchaseClient({
      clientId,
      products,
      totalAmount,
      status: status || 'en attente',
    });

    await newPurchaseClient.save();
    res.status(201).send(newPurchaseClient);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const stockMovementController = require('./stockMovementController');

// Réception des marchandises et mise à jour du stock
exports.receivePurchaseClient = async (req, res) => {
  try {
    const { PurchaseClientId } = req.params;
const purchaseClient = await PurchaseClient.findById(PurchaseClientId);

    if (PurchaseClient.status !== 'confirmée') {
      return res.status(400).send({ error: 'Commande non confirmée' });
    }

    // Mettre à jour le stock
    for (const product of PurchaseClient.products) {
      await Article.findByIdAndUpdate(product.productId, {
        $inc: { stock: product.quantity },  // Ajouter la quantité au stock
      });

      // Log stock movement
      await stockMovementController.addStockMovement({
        articleId: product.productId,
        quantityChange: product.quantity,
        movementType: 'purchase',
        relatedDocumentId: purchaseClient._id,
        relatedDocumentModel: 'PurchaseClient',
      });
    }

    // Mettre à jour le statut de la commande fournisseur
    PurchaseClient.status = 'livrée';
    await PurchaseClient.save();

    res.status(200).send(PurchaseClient);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Liste des commandes fournisseurs
exports.getPurchaseClients = async (req, res) => {
  try {
    const purchaseClient = await PurchaseClient.find().populate([{ path : 'clientId'}, {path :'products.productId'}]);
    res.status(200).send(purchaseClient);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Détail d'une commande fournisseur
exports.getPurchaseClientById = async (req, res) => {
  try {
    const purchaseClient = await PurchaseClient.findById(req.params.id).populate('supplierId').populate('products.productId');
    if (!purchaseClient) {
      return res.status(404).send({ error: 'Commande fournisseur non trouvée' });
    }
    res.status(200).send(purchaseClient);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Impression de la commande fournisseur (génération PDF)
exports.printPurchaseClient = async (req, res) => {
  try {
    const purchaseClient = await PurchaseClient.findById(req.params.id).populate('supplierId').populate('products.productId');
    if (!purchaseClient) {
      return res.status(404).send({ error: 'Commande fournisseur non trouvée' });
    }
    // Utiliser pdfController pour générer PDF (implémentation dépend de pdfController)
    const pdfBuffer = await pdfController.generatePurchaseOrderPDF(purchaseclient);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Impression du bon de réception (génération PDF)
exports.printReceptionOrder = async (req, res) => {
  try {
    const purchaseClient = await PurchaseClient.findById(req.params.id).populate('supplierId').populate('products.productId');
    if (!purchaseClient) {
      return res.status(404).send({ error: 'Bon de réception non trouvé' });
    }
    // Utiliser pdfController pour générer PDF du bon de réception
    const pdfBuffer = await pdfController.generateReceptionOrderPDF(purchaseClient);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const factureController = require('./factureController');
const purchaseclient = require('../models/purchaseclient');

// Conversion de la commande fournisseur en facture
exports.convertPurchaseClientToInvoice = async (req, res) => {
  try {
    const purchaseClient = await PurchaseClient.findById(req.params.id).populate('supplierId').populate('products.productId');
    if (!purchaseClient) {
      return res.status(404).send({ error: 'Commande fournisseur non trouvée' });
    }

    // Prepare invoice data
    const invoiceData = {
      client: purchaseClient.clientId,
      lignes: purchaseClient.products.map(product => ({
        article: product.productId._id,
        quantite: product.quantity,
        prixUnitaire: product.price,
      })),
      PurchaseClientId: p._id,
    };

    // Create invoice using factureController
    const invoice = await factureController.createInvoice(invoiceData);

    res.status(201).send(invoice);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
