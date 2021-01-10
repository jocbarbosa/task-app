const Task = require('../models/Task');

module.exports = {
    index(request, response) {
        Task.find(request.query)
            .limit(10)
            .then((tasks) => {
                response.json(tasks);
            }).catch((error) => {
                response.status(400).send();
            })
    },

    show(request, response) {
        Task.findById(request.params.id)
            .then((task) => {
                if (!task) {
                    response.status(204).send();
                }
                response.json(task);
            })
            .catch(error => {
                response.status(500).json(error);
            });
    },

    store(request, response) {

        const task = new Task({
            ...request.body,
            owner: request.user._id
        })

        task.save()
            .then((task) => {
                response.status(201).json(task);
            }).catch(error => {
                response.status(500).json(error);
            });
    },

    update(request, response) {

        Task.findByIdAndUpdate(request.params.id, request.body, { new: true })
            .then(task => {
                response.json(task);
            })
            .catch(error => {
                response.status(500).json(error);
            });
    },

    destroy(request, response) {
        Task.findByIdAndDelete(request.params.id)
            .then(() => {
                response.send();
            })
            .catch(error => {
                response.status(500).json(error);
            })
    },

    pendingTasks(request, response) {
        Task.find({ done: false })
            .then(task => {
                response.json(task);
            })
            .catch(error => {
                response.send(400).json(error);
            });
    }
}