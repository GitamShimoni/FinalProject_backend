const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type: String},
    unit: {type: String},
    quantity: {type: Number},
    minQuantity: {type: Number},
    isIron: { type: Boolean}, 
    orderId: {type: String},

});

module.exports = mongoose.model('Product', productSchema);
