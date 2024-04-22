const mongoose = require('mongoose');
const category = require('./Category');
const user = require('./User');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    label: {type: String, required: true},
    category: {
        type: Schema.Types.ObjectId,
        ref: category
    },
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: user
    },
    price: {type: Number, required: true}
});

module.exports = mongoose.model('Product', productSchema);