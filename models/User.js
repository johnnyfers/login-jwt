const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: false, max: 50 },
    email: { type: String, required: true, min: 5, max: 50 },
    password: { type: String, required: true, min: 6, max: 15 },
    createdAt: {type: Date, default: Date.now},
    admin: {tyle: Boolean, default: false}
});

module.exports = mongoose.model('User',userSchema);