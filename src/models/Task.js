const mongoose = require('mongoose');
const validator = require('validator');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length > 800) {
                throw new Error('Description must have until 800 characters!')
            }
        },
    },
    priority: {
        type: Boolean,
        required: true
    },
    done: {
        type: Boolean,
        required: true
    },
});

module.exports = mongoose.model('Task', TaskSchema);