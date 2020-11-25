const express = require('express');
const routes = express.Router();

const authenticationMiddleware = require('../middleware/authentication')

const UserController = require('../controllers/UserController');

// User Routes
routes.post('/users', UserController.store);
routes.get('/users', authenticationMiddleware, UserController.index);
routes.get('/users/:id', UserController.show);
routes.delete('/users/:id', UserController.destroy);
routes.put('/users/:id', UserController.update);

module.exports = routes;