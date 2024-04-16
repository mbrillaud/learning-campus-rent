const mongoose = require('mongoose');
const category = require('./Category');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    label: {type: String, required: true},
    category: {
        type: Schema.Types.ObjectId,
        ref: category
    },
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
    ownerId: {type: String, required: true},
    price: {type: Number, required: true}
});

module.exports = mongoose.model('Product', productSchema);