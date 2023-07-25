const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {type: String},
    contractors:[{ type: mongoose.Types.ObjectId, ref: "Contractor"}],
    orders:[{ type: mongoose.Types.ObjectId, ref: "Product"}],
    inventory:[{ type: mongoose.Types.ObjectId, ref: "Inventory"}],
    startingDate: {type: Date},
    finishDate: {type: Date},
    projectManager: {type: String}
    
});

module.exports = mongoose.model('Project', projectSchema);