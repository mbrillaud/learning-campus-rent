const Order = require('../models/Order');
const Product = require('../models/Product');
const helpers = require('../helpers');

/**
 * Ajoute une nouvelle commande.
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @param {Function} next - Callback de prochaine étape.
 */
exports.addOrder = (req, res, next) => {
    delete req.body._id;
    const userId = helpers.getUserIdWithToken(req.headers.authorization);
    if (userId) {
        req.body.orderOwnerId = userId;
    }

    // Vérifier si le produit existe
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            // Vérifier si une commande existe pour le même produit et chevauche les dates fournies
            Order.find({
                productId: req.body.productId,
                $or: [
                    {
                        startingDate: { $lte: req.body.startingDate },
                        endingDate: { $gte: req.body.startingDate }
                    },
                    {
                        startingDate: { $lte: req.body.endingDate },
                        endingDate: { $gte: req.body.endingDate }
                    },
                    {
                        startingDate: { $gte: req.body.startingDate },
                        endingDate: { $lte: req.body.endingDate }
                    }
                ]
            })
                .then(existingOrders => {
                    if (existingOrders.length > 0) {
                        // Il existe déjà une commande pour ce produit aux mêmes dates ou se chevauchant
                        return res.status(400).json({ error: 'Product not available at specified dates' });
                    } else {
                        // Aucune commande n'existe aux mêmes dates, enregistrer la nouvelle commande
                        const order = new Order({
                            ...req.body
                        });

                        order.save()
                            .then(() => res.status(200).json({ message: 'Order saved' }))
                            .catch(error => res.status(400).json({ error }));
                    }
                })
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(400).json({ error }));
};

/**
 * Récupère une commande par son ID.
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @param {Function} next - Callback de prochaine étape.
 */
exports.getOrder = (req, res, next) => {
    Order.findOne({ _id: req.params.id })
        .then(order => res.status(200).json(order))
        .catch(error => res.status(404).json({ error }));
};

/**
 * Récupère toutes les commandes liées à un produit.
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @param {Function} next - Callback de prochaine étape.
 */
exports.getOrdersByProductId = (req, res, next) => {
    Order.find({ productId: req.params.productId })
        .then(orders => res.status(200).json(orders))
        .catch(error => res.status(404).json(error));
};

/**
 * Récupère toutes les commandes liées à un utilisateur.
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @param {Function} next - Callback de prochaine étape.
 */
exports.getOrderByUserId = (req, res, next) => {
    Order.find({ orderOwnerId: req.params.userId })
        .then(orders => res.status(200).json(orders))
        .catch(error => res.status(404).json(error));
};

/**
 * Met à jour une commande existante.
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @param {Function} next - Callback de prochaine étape.
 */
exports.updateOrder = (req, res, next) => {
    const userId = req.auth.userId;

    Order.findById(req.params.id)
        .then(order => {
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            if (order.orderOwnerId.toString() !== userId) {
                return res.status(403).json({ message: 'Unauthorized' });
            }

            Order.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Order updated' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};


/**
 * Supprime une commande.
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 * @param {Function} next - Callback de prochaine étape.
 */
exports.deleteOrder = (req, res, next) => {
    const orderId = req.params.id;
    const userId = req.auth.userId;

    Order.findById(orderId)
        .then(order => {
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }

            if (order.orderOwnerId.toString() !== userId) {
                return res.status(403).json({ error: 'Unauthorized' });
            }

            // Si les IDs correspondent, supprimer la commande
            order.deleteOne()
                .then(() => res.status(200).json({ message: 'Order deleted' }))
                .catch(error => res.status(500).json({ error: 'Internal Server Error' }));
        })
        .catch(error => res.status(500).json({ error: 'Internal Server Error' }));
};

