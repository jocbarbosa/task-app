const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = {

    store(request, response) {
        User.create(request.body)
            .then(user => {
                response.json(user);
            })
            .catch(error => {
                response.status(500).json(error);
            });
    }
}