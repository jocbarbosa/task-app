const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = {

    async index(request, response) {

        try {
            const user = await User.find();

            if (!user) {
                return response.status(404).send(user);
            }

            response.json(user);
        } catch (error) {
            response.status(500).json(error);
        }

    },

    async show(request, response) {

        try {
            const user = await User.findById(request.params.id);
            response.json(user);
        } catch (error) {
            response.status(500).json(error);
        }

    },

    async update(request, response) {

        const updates = Object.keys(request.body);
        const allowedUpdates = ['name', 'email', 'password'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

        if (!isValidOperation) {
            response.status(400).json({ message: 'There are fields not allowed to update' });
        }

        try {
            const user = await User.findById(request.params.id);

            updates.forEach((update) => {
                user[update] = request.body[update];
            });

            const userSave = await user.save();

            response.json(userSave);

        } catch (error) {
            response.status(500).json(error);
        }
    },

    async store(request, response) {
        try {
            const user = await User.create(request.body);

            response.json(user);

        } catch (error) {
            response.status(500).json(error);
        }

    },
    async destroy(request, response) {


        try {
            const user = await User.findByIdAndDelete(request.params.id);

            if (!user) {
                response.status(404).json({ message: 'User not found' });
            }

            return response.send();
        } catch (error) {
            response.status(500).json(error);
        }

    },

    async login(request, response) {

    }
}