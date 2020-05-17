const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = {

    index(request, response) {
        User.find()
            .then(users => {
                response.json(users);
            })
            .catch(error => {
                response.status(500).json(error);
            })
    },

    show(request, response) {
        User.findById(request.params.id)
            .then(user => {
                response.json(user);
            })
            .catch(error => {
                response.status(500).json(error);
            })
    },

    update(request, response) {
        User.findOneAndUpdate(request.params.id, request.body, { new: true })
            .then((user) => {
                response.json(user);
            })
            .catch(error => {
                response.status(500).json(error);
            })
    },

    store(request, response) {
        User.create(request.body)
            .then(user => {
                response.status(201).json(user);
            })
            .catch(error => {
                response.status(500).json(error);
            });
    },
    async destroy(request, response) {
        User.findOneAndDelete({ _id: request.params.id })
            .then(user => {
                response.json(user);
            })
            .catch(error => {
                response.status(500).json(error);
            });
    }
}