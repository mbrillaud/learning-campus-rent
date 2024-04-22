const Comment = require('../models/Comment');

/**
 * Ajoute un nouveau commentaire.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 * @param {Function} next - Le middleware suivant.
 */
exports.addComment = (req, res, next) => {
    delete req.body._id;
    const userId = req.auth.userId;

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
    const commentId = req.params.id;
    const userId = req.auth.userId;
    const isAdmin = req.auth.userStatus;

    Comment.findById(commentId)
        .then(comment => {

            if (!comment) {
                return res.status(404).json({ error: 'Comment not found' });
            }

            if (comment.posterId.toString() !== userId && !isAdmin) {
                return res.status(403).json({ error: 'Unauthorized' });
            }

            comment.deleteOne()
                .then(() => res.status(200).json({ message: 'Comment deleted' }))
                .catch(error => res.status(500).json({ error: 'Internal Server Error' }));
        })
        .catch(error => res.status(500).json({ error: 'Internal Server Error' }));
};

/**
 * Met à jour un commentaire par son identifiant.
 * @param {Object} req - La requête HTTP.
 * @param {Object} res - La réponse HTTP.
 * @param {Function} next - Le middleware suivant.
 */
exports.updateComment = (req, res, next) => {
    console.log('req.auth : ', req.auth);
    const commentId = req.params.id;
    const userId = req.auth.userId;
    const isAdmin = req.auth.userStatus;

    Comment.findById(commentId)
        .then(comment => {

            if (!comment) {
                return res.status(404).json({ error: 'Comment not found' });
            }

            if (comment.posterId.toString() !== userId && !isAdmin) {
                return res.status(403).json({ error: 'Unauthorized' });
            }

            Comment.updateOne({_id: commentId}, {...req.body, _id: commentId})
                .then(() => res.status(200).json({message: 'Comment updated'}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({ error: 'Internal Server Error' }));
};