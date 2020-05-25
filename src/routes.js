const express = require('express');
const routes = express.Router();

const TaskController = require('./controllers/TaskController');
const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');

routes.get('/', (request, response) => {
    response.json({ message: "hello" });
});

// Task Routes
routes.post('/tasks', TaskController.store);
routes.get('/tasks', TaskController.index);
routes.put('/tasks/:id', TaskController.update);
routes.delete('/tasks/:id', TaskController.destroy);
routes.get('/tasks/pending', TaskController.pendingTasks);

// Login routes
routes.post('/users/login', AuthController.login);

// User Routes
routes.post('/users', UserController.store);
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.delete('/users/:id', UserController.destroy);
routes.put('/users/:id', UserController.update);

module.exports = routes;