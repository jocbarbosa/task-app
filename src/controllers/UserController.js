const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = {

    async index(request, response) {

        try {
            const user = await User.find()
                .select({ "name": 1, "_id": 0, "age": 1, "email": 1 });

            if (!user) {
                return response.status(404).send();
            }

            response.json(user);
        } catch (error) {
            response.status(500).json(error);
        }

    },

    async show(request, response) {

        try {
            const user = await User.findById(request.params.id)
                .select({ "name": 1, "_id": 0, "age": 1, "email": 1 });;
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
            return response.status(400).json({ message: 'There are fields not allowed to update' });
        }

        try {
            user = request.user;

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

            const token = await user.generateAuthToken();

            response.status(201).json(user);

        } catch (error) {
            response.status(500).json(error);
        }

    },
    async destroy(request, response) {
        try {
            await request.user.remove();

            return response.send();
        } catch (error) {
            response.status(500).json(error);
        }

    },

    async getProfile(request, response) {
        response.json(request.user);
    },

    async setProfilePic(request, response) {

        const userId = request.user._id;

        const userInstance = await User.findById(userId);

        userInstance.picture = request.file.originalname;

        await userInstance.save();

        response.send();
    },

    async logout(request, response) {
        try {
            request.user.tokens = request.user.tokens.filter((token) => {
                return token.token !== request.token;
            })

            await request.user.save();

            response.send();
        } catch (e) {
            response.status(500).send();
        }
    },

    async logoutAll(request, response) {
        try {
            request.user.tokens = [];

            await request.user.save();

            response.send();
        } catch (e) {
            response.status(500).send();
        }
    }
}