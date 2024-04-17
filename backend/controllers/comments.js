const Comment = require('../models/Comment');
const helpers = require('../helpers');

/**
 * Ajoute un nouveau commentaire.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 * @param {Function} next - Le middleware suivant.
 */
exports.addComment = (req, res, next) => {
    delete req.body._id;
    const userId = helpers.getUserIdWithToken(req.headers.authorization);
    if (userId) {
        req.body.posterId = userId;
    }
    const comment = new Comment({
        ...req.body
    });

    comment.save()
        .then(() => res.status(200).json({message: 'Comment saved'}))
        .catch(error => res.status(400).json({error}));
};

/**
 * Récupère tous les commentaires associés à un produit.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 * @param {Function} next - Le middleware suivant.
 */
exports.getCommentsByProductId = (req, res, next) => {
    Comment.find({productId: req.params.productId})
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(404).json(error));
};

/**
 * Supprime un commentaire par son identifiant.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 * @param {Function} next - Le middleware suivant.
 */
exports.deleteComment = (req, res, next) => {
    Comment.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message: 'Comment deleted'}))
        .catch(error => res.status(404).json({error}));
};

/**
 * Met à jour un commentaire par son identifiant.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 * @param {Function} next - Le middleware suivant.
 */
exports.updateComment = (req, res, next) => {
    Comment.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
        .then(() => res.status(200).json({message: 'Comment updated'}))
        .catch(error => res.status(400).json({error}));
};
