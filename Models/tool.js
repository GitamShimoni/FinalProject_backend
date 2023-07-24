const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
    toolName: {type: String},
    takenBy: {type: String},
    signed: {type: Boolean},
    date: {type: Date}
});

module.exports = mongoose.model('Tool', toolSchema);
