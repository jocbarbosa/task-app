const express = require('express');
const authenticationMiddleware = require('../middleware/authentication');
const routes = express.Router();

const TaskController = require('../controllers/TaskController');

routes.post('/tasks', authenticationMiddleware, TaskController.store);
routes.get('/tasks', TaskController.index);
routes.put('/tasks/:id', TaskController.update);
routes.delete('/tasks/:id', TaskController.destroy);
routes.get('/tasks/pending', TaskController.pendingTasks);

module.exports = routes;