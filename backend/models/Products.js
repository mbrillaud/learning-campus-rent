const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    label: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
    ownerId: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true},
});

module.exports = mongoose.model('Products', productsSchema);