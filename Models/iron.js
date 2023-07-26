const mongoose = require('mongoose');

const ironSchema = new mongoose.Schema({
    ironName: { type: String},
    reqDate: { type: Date},
    targetDate: { type: Date},
    deliveryDate: { type: Date},
    quantity: { type: Number},
    status: { type: String},
    imgSrc: { type: String}
});

module.exports = mongoose.model('Iron', ironSchema);