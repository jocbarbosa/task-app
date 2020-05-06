const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: String,
    description: String,
    priority: Boolean,
    done: Boolean
});

module.exports = mongoose.model('Task', TaskSchema);