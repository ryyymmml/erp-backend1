

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/config');
const { authMiddleware, isAdmin } = require('./middleware/authMiddleware');
const errorHandler = require('./middleware/errorHandler');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const port = config.port;

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ERP Backend API',
      version: '1.0.0',
      description: 'API documentation for the ERP backend system',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Local server',
      }
    ]
  },
  apis: ['./Routes/*.js'], // files containing annotations for the Swagger docs
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(cors({
  origin: config.corsOrigin,
  credentials: true
}));

app.use(express.urlencoded({extended:true}));
app.use(express.json()); // ⚠️ À ajouter pour les requêtes JSON (Postman !)

// Importation des modèles et routes
const Client = require('./models/Client');
const Article = require('./models/Article');
const fournisseurRoutes = require('./Routes/fournisseurRoutes');
const authRoutes = require('./Routes/auth.routes');
const clientRoutes = require('./Routes/client.routes');
const factureRoutes = require('./Routes/factureRoutes');
const facture_fournisseurRoutes = require('./Routes/facture_fournisseur.routes');
const stockMovementRoutes = require('./Routes/stockMovementRoutes');
const articleRoutes = require('./Routes/articleRoutes');
const userRoutes = require('./Routes/user.routes');
const paiementRoutes = require('./Routes/paiement.routes');
const employeRoutes = require('./Routes/employe.routes');
const paieRoutes = require('./Routes/paie.routes');
const abonnementRoutes = require('./Routes/abonnementRoutes');
const orderRoutes = require('./Routes/orderRoutes');

const reportRoutes = require('./Routes/reportRoutes');
const purchaseOrderRoutes = require('./Routes/purchaseOrderRoutes');
const purchaseClientRoutes = require('./Routes/purchaseclientRoutes');


const configRoutes = require('./Routes/configRoutes');
const avoirRoutes = require('./Routes/avoirRoutes');
const dashboardRoutes = require('./Routes/dashboardRoutes');


// Routes
app.get('/', (req, res) => {
  res.sendFile("./views/home.html", { root: __dirname });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/fournisseurs', fournisseurRoutes);
app.use('/api/users', userRoutes);
app.use('/api/clients', authMiddleware, clientRoutes); // Protect client routes with auth
app.use('/api/factures', authMiddleware, factureRoutes); // Protect facture routes with auth
app.use('/api/facture_fournisseurs', authMiddleware, facture_fournisseurRoutes); // Protect facture routes with auth
app.use('/api/stock-movements', authMiddleware, stockMovementRoutes); // Protect stock movement routes with auth
app.use('/api/paiements', authMiddleware, paiementRoutes); // Protect paiement routes with auth
app.use('/api/employes', authMiddleware, employeRoutes); // Protect employe routes with auth
app.use('/api/paies', authMiddleware, paieRoutes); // Protect paie routes with auth
app.use('/api/abonnements',  abonnementRoutes); // Protect abonnement routes with auth
app.use('/api/orders', authMiddleware, orderRoutes); // Protect order routes with auth
app.use('/api/purchase-orders', authMiddleware, purchaseOrderRoutes); // Protect purchase order routes with auth
app.use('/api/purchaseclients', authMiddleware, purchaseClientRoutes); 

app.use('/api/reports', reportRoutes); // Add report routes

app.use('/api/config', configRoutes);
app.use('/api/avoirs', avoirRoutes);
app.use('/api/dashboard', dashboardRoutes);

const congeRoutes = require('./Routes/conge.routes');
const ecritureRoutes = require('./Routes/ecritureRoutes');
const lettrageRoutes = require('./Routes/lettrageRoutes');

app.use('/api/conges', congeRoutes); // Add conge routes
app.use('/api/ecritures', ecritureRoutes);
app.use('/api/lettrage', lettrageRoutes);

app.use(errorHandler); // Middleware global pour toutes les erreurs

// Connexion à MongoDB
mongoose.connect("mongodb+srv://Rym:L%40vdy5K5jK6v%40iD@cluster0.byuhv6r.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("✅ Connexion à MongoDB réussie.");
  })
  .catch((err) => {
    console.error("❌ Erreur de connexion MongoDB :", err);
  });


module.exports = app;

if (require.main === module) {
  const port = config.port || 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
