const Products = require('../models/Products');
const helpers = require('../helpers');

exports.addProduct = (req, res, next) => {
    delete req.body._id;
    const userId = helpers.getUserIdWithToken(req.headers.authorization);
    if(userId) {
        req.body.ownerId = userId;
    }
    const product = new Products({
        ...req.body
    });

    product.save()
        .then(() => res.status(200).json({message: 'Product saved'}))
        .catch(error => res.status(400).json({error}))
};

exports.getProducts = (req, res, next) => {
    Products.find()
        .then(products => res.status(200).json(products))
        .catch(error => res.status(400).json({ error }));
}

exports.getProduct = (req, res, next) => {
    Products.findOne({_id: req.params.id})
        .then(products => res.status(200).json(products))
        .catch(error => res.status(404).json({ error }));
}

exports.deleteProduct = (req, res, next) => {
    Products.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Product deleted'}))
      .catch(error => res.status(404).json({ error }));
}

exports.updateProduct = (req, res, next) => {
    Products.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Product updated'}))
      .catch(error => res.status(400).json({ error }));
  }