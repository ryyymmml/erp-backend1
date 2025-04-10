const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware ou configs ici si besoin

// Routes
app.get('/', (req, res) => {
  res.sendFile("./views/home.html", { root: __dirname });
});

// Connexion à MongoDB puis démarrage du serveur
mongoose.connect("mongodb+srv://Rym:L%40vdy5K5jK6v%40iD@cluster0.byuhv6r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("✅ Connexion à MongoDB réussie.");
    app.listen(port, () => {
      console.log(`🚀 Serveur lancé : http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.error("❌ Erreur de connexion MongoDB :", err);
  });

