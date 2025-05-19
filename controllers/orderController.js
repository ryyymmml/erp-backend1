const Order = require('../models/orderModel');
const Article = require('../models/Article');  // Pour mettre à jour les stocks

// Créer une commande
exports.createOrder = async (req, res) => {
  try {
    const { clientId, products } = req.body;
    let totalAmount = 0;
    
    // Calcul du total de la commande
    for (const product of products) {
      totalAmount += product.price * product.quantity;
    }

    const order = new Order({
      clientId,
      products,
      totalAmount,
      status: 'en attente',
    });

    // Sauvegarder la commande
    await order.save();

    // Mettre à jour le stock
    for (const product of products) {
      await Article.findByIdAndUpdate(product.productId, {
        $inc: { stock: -product.quantity },  // Décrémenter le stock
      });
    }

    res.status(201).send(order);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Suivre les commandes (exemple de route GET)
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('clientId').populate('products.productId');
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
