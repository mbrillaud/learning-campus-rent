const Comments = require('../models/Comments');
const helpers = require('../helpers');

exports.addComment = (req, res, next) => {
    delete req.body._id;
    const userId = helpers.getUserIdWithToken(req.headers.authorization);
    if(userId) {
        req.body.posterId = userId;
    }
    const comment = new Comments({
        ...req.body
    });

    comment.save()
        .then(() => res.status(200).json({message: 'Comment saved'}))
        .catch(error => res.status(400).json({error}))
};

exports.getCommentsByProductId = (req, res, next) => {
    Comments.find({productId: req.params.productId})
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(404).json(error))
}

exports.deleteComment = (req, res, next) => {
    Comments.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Comment deleted'}))
      .catch(error => res.status(404).json({ error }));
}

exports.updateComment = (req, res, next) => {
    console.log('req.params.id : ', req.params.id);
    Comments.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Comment updated'}))
      .catch(error => res.status(400).json({ error }));
  }