const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    productId: {type: String, required: true},
    userId: {type: String, required: true},
    comment: {type: String, required: true},
    createdAt: {type: Date, required: true}
});

module.exports = mongoose.model('Comment', commentSchema);