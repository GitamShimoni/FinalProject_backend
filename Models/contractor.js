const mongoose = require('mongoose');

const contractorSchema = new mongoose.Schema({
    name: {type: String},
    contractors:[{ type: mongoose.Types.ObjectId, ref: "Contractor"}],
    services:[{ type: mongoose.Types.ObjectId, ref: "Service"}]
});

module.exports = mongoose.model('Contractor', contractorSchema);
