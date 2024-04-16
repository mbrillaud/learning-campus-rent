const mongoose = require('mongoose');

const categoriesSchema = mongoose.Schema({
    label: {type: String, required: true},
});

module.exports = mongoose.model('Categories', categoriesSchema);