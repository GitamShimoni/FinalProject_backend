const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type: String},
    unit: {type: String},
    quantity: {type: Number},
    minimum: {type: Number},
    arrived: { type: Boolean}, 
    phone: { type: Date}
    
});

module.exports = mongoose.model('Product', productSchema);
