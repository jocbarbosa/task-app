const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    age: {
        type: Number,
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);