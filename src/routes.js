const express = require('express');
const routes = express.Router();

const TaskController = require('./controllers/TaskController');

routes.get('/', (request, response) => {
    response.json({ message: "hello" });
});

routes.post('/tasks', TaskController.store);

module.exports = routes;