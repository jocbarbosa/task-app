const Task = require('../models/Task');

module.exports = {
    async index(request, response) {
        const tasks = await Task.find();

        return response.json(tasks);
    },

    async store(request, response) {
        const { name, description, priority, done } = request.body;
        const task = await Task.create({
            name, description, priority, done
        });

        return response.json(task);
    },

    async update(request, response) {

        const task = await Task.findByIdAndUpdate(request.params.id, request.body, { new: true });

        return response.json(task);
    },

    async destroy(request, response) {
        const task = await Task.findByIdAndDelete(request.params.id);

        return response.send();
    }
}