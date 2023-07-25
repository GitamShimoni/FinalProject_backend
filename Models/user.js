const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {type: String},
    password: {type: String},
    fullName: {type: Boolean},
    phoneNumber: {type: String},
    email: {type: String}
});

module.exports = mongoose.model('User', userSchema);