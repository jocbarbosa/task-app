const Task = require('../models/Task');

module.exports = {
    async index(request, response) {
        const tasks = await Task.find().then((tasks) => {
            return response.json(tasks);
        }).catch((error) => {
            return response.status(400).send();
        })
    },

    async show(request, response) {
        const task = await Task.findById(request.params.id)
            .then((task) => {
                if (!task) {
                    return response.status(204).send();
                }
                return response.json(task);
            })
            .catch(error => {
                return response.status(400).json(error);
            });
    },

    async store(request, response) {
        const { name, description, priority, done } = request.body;

        const task = Task.create({
            name, description, priority, done
        }).then((task) => {
            response.status(201).json(task);
        }).catch(error => {
            response.status(400).json(error);
        });
    },

    async update(request, response) {

        const task = await Task.findByIdAndUpdate(request.params.id, request.body, { new: true })
            .then(task => {
                return response.json(task);
            })
            .catch(error => {
                return response.status(400).json(error);
            });

        return response.json(task);
    },

    async destroy(request, response) {
        const task = await Task.findByIdAndDelete(request.params.id)
            .then(() => {
                return response.send();
            })
            .catch(error => {
                return response.status(400).json(error);
            })

        return response.send();
    }
}