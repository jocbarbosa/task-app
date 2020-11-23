const express = require('express');
const routes = express.Router();

const AuthController = require('../controllers/AuthController');

// Login routes
routes.post('/users/login', AuthController.login);

module.exports = routes;