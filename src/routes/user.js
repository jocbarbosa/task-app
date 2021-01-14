const express = require('express');
const routes = express.Router();

const multer = require('multer');

const upload = multer({
    dest: 'avatars'
});

const authenticationMiddleware = require('../middleware/authentication')

const UserController = require('../controllers/UserController');

// User Routes
routes.post('/users', UserController.store);
routes.get('/users', authenticationMiddleware, UserController.index);
routes.get('/users/me', authenticationMiddleware, UserController.getProfile);
routes.post('/users/me/avatar', upload.single('profilepic'), authenticationMiddleware, UserController.setProfilePic);
routes.post('/users/logout', authenticationMiddleware, UserController.logout);
routes.post('/users/logoutAll', authenticationMiddleware, UserController.logoutAll)
routes.get('/users/:id', UserController.show);
routes.delete('/users/me', authenticationMiddleware, UserController.destroy);
routes.put('/users/me', authenticationMiddleware, UserController.update);

module.exports = routes;