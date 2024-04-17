const Category = require('../models/Category');

/**
 * Ajoute une nouvelle catégorie.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 * @param {Function} next - Le middleware suivant.
 */
exports.addCategory = (req, res, next) => {
    delete req.body._id;
    /**
     * @type {Category}
     */
    const category = new Category({
        ...req.body
    });

    category.save()
        .then(() => res.status(200).json({message: 'Category saved'}))
        .catch(error => res.status(400).json({error}));
};

/**
 * Récupère toutes les catégories.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 * @param {Function} next - Le middleware suivant.
 */
exports.getCategories = (req, res, next) => {
    Category.find()
        .then(categories => res.status(200).json(categories))
        .catch(error => res.status(400).json({error}));
};

/**
 * Récupère une catégorie par son identifiant.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 * @param {Function} next - Le middleware suivant.
 */
exports.getCategory = (req, res, next) => {
    Category.findOne({_id: req.params.id})
        .then(categories => res.status(200).json(categories))
        .catch(error => res.status(404).json({error}));
};

/**
 * Supprime une catégorie par son identifiant.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 * @param {Function} next - Le middleware suivant.
 */
exports.deleteCategory = (req, res, next) => {
    Category.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message: 'Category deleted'}))
        .catch(error => res.status(404).json({error}));
};

/**
 * Met à jour une catégorie par son identifiant.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 * @param {Function} next - Le middleware suivant.
 */
exports.updateCategory = (req, res, next) => {
    Category.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
        .then(() => res.status(200).json({message: 'Category updated'}))
        .catch(error => res.status(400).json({error}));
};
