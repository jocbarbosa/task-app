const express = require('express');
const routes = express.Router();

const TaskController = require('./controllers/TaskController');
const UserController = require('./controllers/UserController');

routes.get('/', (request, response) => {
    response.json({ message: "hello" });
});

// Task Routes
routes.post('/tasks', TaskController.store);
routes.get('/tasks', TaskController.index);
routes.put('/tasks/:id', TaskController.update);
routes.delete('/tasks/:id', TaskController.destroy);
routes.get('/tasks/pending', TaskController.pendingTasks);
routes.get('/tasks/:id', TaskController.store);

// User Routes
routes.post('/users', UserController.store);

module.exports = routes;