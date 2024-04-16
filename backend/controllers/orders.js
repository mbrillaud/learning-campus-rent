const Order = require('../models/Order');
const helpers = require('../helpers');

exports.addOrder = (req, res, next) => {
    delete req.body._id;
    const userId = helpers.getUserIdWithToken(req.headers.authorization);
    if(userId) {
        req.body.orderOwnerId = userId;
    }
    const order = new Order({
        ...req.body
    });

    order.save()
        .then(() => res.status(200).json({message: 'Order saved'}))
        .catch(error => res.status(400).json({error}))
};

exports.getOrder = (req, res, next) => {
    Order.findOne({_id: req.params.id})
        .then(order => res.status(200).json(order))
        .catch(error => res.status(404).json({ error }));
}

exports.getOrdersByProductId = (req, res, next) => {
    Order.find({productId: req.params.productId})
        .then(orders => res.status(200).json(orders))
        .catch(error => res.status(404).json(error))

}

exports.getOrderByUserId = (req, res, next) => {
    console.log('req.params.userId : ', req.params.userId);
    Order.find({orderOwnerId: req.params.userId})
        .then(orders => res.status(200).json(orders))
        .catch(error => res.status(404).json(error))
}

exports.updateOrder = (req, res, next) => {
    Order.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Order updated'}))
      .catch(error => res.status(400).json({ error }));
}

exports.deleteOrder = (req, res, next) => {
    Order.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Order deleted'}))
      .catch(error => res.status(404).json({ error }));
}