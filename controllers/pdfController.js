const PDFDocument = require('pdfkit');
const Facture = require('../models/Facture');
const QRCode = require('qrcode');

exports.generateFacturePDFWithQRCode = async (req, res) => {
  try {
    const factureId = req.params.id;
    const facture = await Facture.findById(factureId).populate('client').populate('lignes.article');
    if (!facture) {
      return res.status(404).json({ message: 'Facture non trouvée' });
    }

    const doc = new PDFDocument();
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      let pdfData = Buffer.concat(buffers);
      res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=facture_${facture.numero}.pdf`,
        'Content-Length': pdfData.length
      });
      res.end(pdfData);
    });

    // Title
    doc.fontSize(20).text(`Facture n° ${facture.numero}`, { align: 'center' });
    doc.moveDown();

    // Client info
    doc.fontSize(14).text(`Client: ${facture.client.nom}`);
    doc.text(`Date: ${facture.dateFacturation ? facture.dateFacturation.toISOString().split('T')[0] : 'N/A'}`);
    doc.moveDown();

    // Articles table header
    doc.fontSize(14).text('Articles:', { underline: true });
    doc.moveDown(0.5);

    // Articles list
    facture.lignes.forEach(ligne => {
      const articleName = ligne.article ? ligne.article.nom : 'Article inconnu';
      doc.fontSize(12).text(`- ${articleName}: ${ligne.quantite} x ${ligne.prixUnitaire.toFixed(2)} = ${(ligne.quantite * ligne.prixUnitaire).toFixed(2)}`);
    });
    doc.moveDown();

    // Totals
    doc.fontSize(14).text(`Total HT: ${facture.totalHT.toFixed(2)}`);
    doc.text(`TVA (${facture.tvaRate}%): ${(facture.totalHT * facture.tvaRate / 100).toFixed(2)}`);
    doc.text(`Total TTC: ${facture.totalTTC.toFixed(2)}`);
    doc.moveDown();

    // Generate QR code with invoice reference (numero)
    const qrData = facture.numero;
    const qrImageDataUrl = await QRCode.toDataURL(qrData);

    // Extract base64 data from Data URL
    const base64Data = qrImageDataUrl.replace(/^data:image\/png;base64,/, '');
    const qrImageBuffer = Buffer.from(base64Data, 'base64');

    // Add QR code image to PDF
    const qrImageSize = 100;
    doc.image(qrImageBuffer, doc.page.width - qrImageSize - 50, doc.y, { width: qrImageSize, height: qrImageSize });

    doc.end();

  } catch (error) {
    console.error('Error generating facture PDF with QR code:', error);
    res.status(500).json({ message: 'Erreur lors de la génération du PDF' });
  }
};

exports.generatePurchaseOrderPDF = async (purchaseOrder) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      let buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // Title
      doc.fontSize(20).text(`Commande Fournisseur n° ${purchaseOrder._id}`, { align: 'center' });
      doc.moveDown();

      // Supplier info
      doc.fontSize(14).text(`Fournisseur: ${purchaseOrder.supplierId.nom || purchaseOrder.supplierId._id}`);
      doc.text(`Date: ${purchaseOrder.date ? purchaseOrder.date.toISOString().split('T')[0] : 'N/A'}`);
      doc.moveDown();

      // Products table header
      doc.fontSize(14).text('Produits:', { underline: true });
      doc.moveDown(0.5);

      // Products list
      purchaseOrder.products.forEach(product => {
        const productName = product.productId ? product.productId.nom : 'Produit inconnu';
        doc.fontSize(12).text(`- ${productName}: ${product.quantity} x ${product.price.toFixed(2)} = ${(product.quantity * product.price).toFixed(2)}`);
      });
      doc.moveDown();

      // Total amount
      doc.fontSize(14).text(`Montant total: ${purchaseOrder.totalAmount.toFixed(2)}`);

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

exports.generateReceptionOrderPDF = async (purchaseOrder) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      let buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // Title
      doc.fontSize(20).text(`Bon de Réception n° ${purchaseOrder._id}`, { align: 'center' });
      doc.moveDown();

      // Supplier info
      doc.fontSize(14).text(`Fournisseur: ${purchaseOrder.supplierId.nom || purchaseOrder.supplierId._id}`);
      doc.text(`Date: ${purchaseOrder.date ? purchaseOrder.date.toISOString().split('T')[0] : 'N/A'}`);
      doc.moveDown();

      // Products received table header
      doc.fontSize(14).text('Produits reçus:', { underline: true });
      doc.moveDown(0.5);

      // Products list
      purchaseOrder.products.forEach(product => {
        const productName = product.productId ? product.productId.nom : 'Produit inconnu';
        doc.fontSize(12).text(`- ${productName}: ${product.quantity}`);
      });
      doc.moveDown();

      // Status
      doc.fontSize(14).text(`Statut: ${purchaseOrder.status}`);

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};
