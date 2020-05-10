const Task = require('../models/Task');

module.exports = {
    index(request, response) {
        Task.find().then((tasks) => {
            return response.json(tasks);
        }).catch((error) => {
            return response.status(400).send();
        })
    },

    show(request, response) {
        Task.findById(request.params.id)
            .then((task) => {
                if (!task) {
                    return response.status(204).send();
                }
                return response.json(task);
            })
            .catch(error => {
                return response.status(500).json(error);
            });
    },

    store(request, response) {
        const { name, description, priority, done } = request.body;

        Task.create({
            name, description, priority, done
        }).then((task) => {
            response.status(201).json(task);
        }).catch(error => {
            response.status(500).json(error);
        });
    },

    update(request, response) {

        Task.findByIdAndUpdate(request.params.id, request.body, { new: true })
            .then(task => {
                return response.json(task);
            })
            .catch(error => {
                return response.status(500).json(error);
            });
    },

    destroy(request, response) {
        Task.findByIdAndDelete(request.params.id)
            .then(() => {
                return response.send();
            })
            .catch(error => {
                return response.status(500).json(error);
            })
    },
    async pendingTasks(request, response) {
        response.send("teste")
    }
}