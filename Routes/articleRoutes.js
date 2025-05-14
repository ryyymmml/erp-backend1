const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

router.post('/', articleController.createArticle);         // Ajouter un article
router.get('/', articleController.getArticles);           // Voir tous les articles
router.put('/:id', articleController.updateArticle);      // Modifier
router.delete('/:id', articleController.deleteArticle);   // Supprimer

module.exports = router;
