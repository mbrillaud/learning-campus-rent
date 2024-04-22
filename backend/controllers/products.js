const Product = require('../models/Product');
const helpers = require('../helpers');

/**
 * Ajoute un nouveau produit.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 * @param {Function} next - Le middleware suivant.
 */
exports.addProduct = (req, res, next) => {
    delete req.body._id;
    const userId = req.auth.userId;
    if (userId) {
        req.body.ownerId = userId;
    }
    const product = new Product({
        ...req.body
    });

    product.save()
        .then(() => res.status(200).json({message: 'Product saved'}))
        .catch(error => res.status(400).json({error}));
};

/**
 * Récupère tous les produits.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 * @param {Function} next - Le middleware suivant.
 */
exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => res.status(200).json(products))
        .catch(error => res.status(400).json({error}));
};

/**
 * Récupère un produit par son identifiant.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 * @param {Function} next - Le middleware suivant.
 */
exports.getProduct = (req, res, next) => {
    Product.findOne({_id: req.params.id})
        .then(product => res.status(200).json(product))
        .catch(error => res.status(404).json({error}));
};

/**
 * Supprime un produit par son identifiant.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 * @param {Function} next - Le middleware suivant.
 */
exports.deleteProduct = (req, res, next) => {
    Product.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message: 'Product deleted'}))
        .catch(error => res.status(404).json({error}));
};

/**
 * Met à jour un produit par son identifiant.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 * @param {Function} next - Le middleware suivant.
 */
exports.updateProduct = (req, res, next) => {
    Product.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
        .then(() => res.status(200).json({message: 'Product updated'}))
        .catch(error => res.status(400).json({error}));
};
