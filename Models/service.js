const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    section: {type: String},
    sectionName: {type: String},
    unit: {type: String},
    price: {type: Number},
    contractorId: { type: String}
});

module.exports = mongoose.model('Service', serviceSchema);

