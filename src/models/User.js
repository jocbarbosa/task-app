const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    age: {
        type: Number,
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.generateAuthToken = async function () {
    const user = this;

    const token = jwt.sign({ _id: user.id.toString() }, process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({ token });

    await user.save();

    return token;

}

// Hash plain text password before saving
UserSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next();
});

mongoose.set('useCreateIndex', true);

module.exports = mongoose.model('User', UserSchema);