const User = require('../models/User');

module.exports = {
    async login(request, response) {
        try {
            const user = await User.findByCredentials(request.body.username, request.body.password, (err, user, msg) => {
                if (err) {
                    return response.status(500).send(err);
                }

                if (user) {
                    response.send(user);
                }
            });
        } catch (error) {
            response.status(500).json(error);
        }
    }
}