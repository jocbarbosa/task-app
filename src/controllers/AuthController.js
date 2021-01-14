const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    async login(request, response) {
        try {
            const { email, password } = request.body;
            const user = await User.findOne({ email });
            const token = await user.generateAuthToken();

            if (!user) {
                throw new Error('Unable to login');
            }


            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                throw new Error('Unable to login');
            }

            response.json(user);

        } catch (error) {
            response.status(400).json(error);
        }
    }
}