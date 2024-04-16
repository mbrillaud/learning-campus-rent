const mongoose = require('mongoose');
const user = require('./User');
const product = require('./Product');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: product
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: user
    },
    comment: {type: String, required: true},
    createdAt: {type: Date, required: true}
});

module.exports = mongoose.model('Comment', commentSchema);