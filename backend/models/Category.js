const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    label: {type: String, required: true},
});

module.exports = mongoose.model('Category', categorySchema);
