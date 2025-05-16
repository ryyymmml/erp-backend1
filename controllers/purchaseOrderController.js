const PurchaseOrder = require('../models/purchaseOrderModel');
const Article = require('../models/Article');
const pdfController = require('./pdfController'); // Assuming pdfController has PDF generation utilities

// Créer une commande fournisseur
exports.createPurchaseOrder = async (req, res) => {
  try {
    const { supplierId, products, status } = req.body; 
    let totalAmount = 0;
    
    // Calcul du total de la commande
    for (const product of products) {
      totalAmount += product.price * product.quantity;
    }

    const purchaseOrder = new PurchaseOrder({
      supplierId,
      products,
      totalAmount,
      status: status || 'en attente',
    });

    // Sauvegarder la commande fournisseur
    await purchaseOrder.save();
    res.status(201).send(purchaseOrder);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const stockMovementController = require('./stockMovementController');

// Réception des marchandises et mise à jour du stock
exports.receivePurchaseOrder = async (req, res) => {
  try {
    const { purchaseOrderId } = req.params;
    const purchaseOrder = await PurchaseOrder.findById(purchaseOrderId);

    if (purchaseOrder.status !== 'confirmée') {
      return res.status(400).send({ error: 'Commande non confirmée' });
    }

    // Mettre à jour le stock
    for (const product of purchaseOrder.products) {
      await Article.findByIdAndUpdate(product.productId, {
        $inc: { stock: product.quantity },  // Ajouter la quantité au stock
      });

      // Log stock movement
      await stockMovementController.addStockMovement({
        articleId: product.productId,
        quantityChange: product.quantity,
        movementType: 'purchase',
        relatedDocumentId: purchaseOrder._id,
        relatedDocumentModel: 'PurchaseOrder',
      });
    }

    // Mettre à jour le statut de la commande fournisseur
    purchaseOrder.status = 'livrée';
    await purchaseOrder.save();

    res.status(200).send(purchaseOrder);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Liste des commandes fournisseurs
exports.getPurchaseOrders = async (req, res) => {
  try {
    const purchaseOrders = await PurchaseOrder.find().populate('supplierId').populate('products.productId');
    res.status(200).send(purchaseOrders);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Détail d'une commande fournisseur
exports.getPurchaseOrderById = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findById(req.params.id).populate('supplierId').populate('products.productId');
    if (!purchaseOrder) {
      return res.status(404).send({ error: 'Commande fournisseur non trouvée' });
    }
    res.status(200).send(purchaseOrder);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Impression de la commande fournisseur (génération PDF)
exports.printPurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findById(req.params.id).populate('supplierId').populate('products.productId');
    if (!purchaseOrder) {
      return res.status(404).send({ error: 'Commande fournisseur non trouvée' });
    }
    // Utiliser pdfController pour générer PDF (implémentation dépend de pdfController)
    const pdfBuffer = await pdfController.generatePurchaseOrderPDF(purchaseOrder);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Impression du bon de réception (génération PDF)
exports.printReceptionOrder = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findById(req.params.id).populate('supplierId').populate('products.productId');
    if (!purchaseOrder) {
      return res.status(404).send({ error: 'Bon de réception non trouvé' });
    }
    // Utiliser pdfController pour générer PDF du bon de réception
    const pdfBuffer = await pdfController.generateReceptionOrderPDF(purchaseOrder);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const factureController = require('./factureController');

// Conversion de la commande fournisseur en facture
exports.convertPurchaseOrderToInvoice = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findById(req.params.id).populate('supplierId').populate('products.productId');
    if (!purchaseOrder) {
      return res.status(404).send({ error: 'Commande fournisseur non trouvée' });
    }

    // Prepare invoice data
    const invoiceData = {
      client: purchaseOrder.supplierId,
      lignes: purchaseOrder.products.map(product => ({
        article: product.productId._id,
        quantite: product.quantity,
        prixUnitaire: product.price,
      })),
      purchaseOrderId: purchaseOrder._id,
    };

    // Create invoice using factureController
    const invoice = await factureController.createInvoice(invoiceData);

    res.status(201).send(invoice);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
