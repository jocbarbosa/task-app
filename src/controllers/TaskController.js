const Task = require('../models/Task');

module.exports = {
    async store(request, response) {
        const { name, description } = request.body;
        const task = await Task.create({
            name, description
        });

        return response.json(task);
    }
}