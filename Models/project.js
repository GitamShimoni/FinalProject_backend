const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {type: String},
    contractors:[{ type: mongoose.Types.ObjectId, ref: "Contractor"}],
    orders:[{ type: mongoose.Types.ObjectId, ref: "Product"}],
    inventory:[{ type: mongoose.Types.ObjectId, ref: "Inventory"}]
});

module.exports = mongoose.model('Project', projectSchema);