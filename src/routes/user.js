const express = require('express');
const routes = express.Router();

const authenticationMiddleware = require('../middleware/authentication');
const UserController = require('../controllers/UserController');

const multer = require('multer');

const upload = multer({
    dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.endsWith('.jpg') && !file.originalname.endsWith('.png')) {
            return cb(new Error('The file must be and JPG or PNG image.'))
        }

        cb(undefined, true);
    }
});



// User Routes
routes.use('/users', authenticationMiddleware);

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);
routes.get('/users/me', UserController.getProfile);
routes.post('/users/me/avatar', upload.single('profilepic'), UserController.setProfilePic, (error, req, res, next) => {
    res.status(400).json({ error: error.message });
});
routes.post('/users/logout', UserController.logout);
routes.post('/users/logoutAll', UserController.logoutAll)
routes.get('/users/:id', UserController.show);
routes.delete('/users/me', UserController.destroy);
routes.put('/users/me', UserController.update);

routes.get('/users/:id/avatar', UserController.getAvatar);

module.exports = routes;