const Article = require('../models/Article');
const { articleSchema } = require('../validations/articleValidation');

// Créer un article
exports.createArticle = async (req, res, next) => {
  try {
    const { error } = articleSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const article = await Article.create(req.body);
    res.status(201).json(article);
  } catch (err) {
    next(err);
  }
};

// Lister les articles avec pagination et filtre par nom ou référence
exports.getArticles = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const searchNom = req.query.searchNom || "";
    const searchReference = req.query.searchReference || "";

    const skip = (page - 1) * limit;

    const query = {};
    if (searchNom) {
      query.nom = { $regex: searchNom, $options: 'i' };
    }
    if (searchReference) {
      query.reference = { $regex: searchReference, $options: 'i' };
    }

    const total = await Article.countDocuments(query);
    const articles = await Article.find(query).skip(skip).limit(limit);

    res.json({
      success: true,
      data: articles,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    next(err);
  }
};

// Mettre à jour un article
exports.updateArticle = async (req, res, next) => {
  try {
    const { error } = articleSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(article);
  } catch (err) {
    next(err);
  }
};

// Supprimer un article
exports.deleteArticle = async (req, res, next) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: 'Article supprimé' });
  } catch (err) {
    next(err);
  }
};
