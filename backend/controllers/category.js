const Category = require('../models/Category');

exports.addCategory = (req, res, next) => {
    delete req.body._id;
    const category = new Category({
        ...req.body
    });

    category.save()
        .then(() => res.status(200).json({message: 'Category saved'}))
        .catch(error => res.status(400).json({error}))
};

exports.getCategories = (req, res, next) => {
    Category.find()
        .then(categories => res.status(200).json(categories))
        .catch(error => res.status(400).json({ error }));
}

exports.getCategory = (req, res, next) => {
    Category.findOne({_id: req.params.id})
        .then(categories => res.status(200).json(categories))
        .catch(error => res.status(404).json({ error }));
}

exports.deleteCategory = (req, res, next) => {
    Category.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Category deleted'}))
      .catch(error => res.status(404).json({ error }));
}

exports.updateCategory = (req, res, next) => {
    Category.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Category updated'}))
      .catch(error => res.status(400).json({ error }));
  }