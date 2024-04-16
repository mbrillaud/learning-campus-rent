const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    label: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
    ownerId: {type: String, required: true},
    price: {type: Number, required: true},
    category: [{
        type: Schema.Types.ObjectId,
        ref: ''
    }],
});

module.exports = mongoose.model('Product', productSchema);