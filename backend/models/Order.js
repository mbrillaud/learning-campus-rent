const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = require('./Product');
const user = require('./User');

const orderSchema =  new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: product
    },
    orderOwnerId: {
        type: Schema.Types.ObjectId,
        ref: user
    },
    startingDate: {type: Date, required: true},
    endingDate: {type: Date, required: true}
});

module.exports = mongoose.model('Order', orderSchema);