require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.STRING_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const routesTask = require('./routes/task');
const routesAuth = require('./routes/auth');
const routesUser = require('./routes/user');

const maintenanceMiddleware = require('./middleware/maintenance');


app.use(maintenanceMiddleware);

app.use(express.json());
app.use(routesTask);
app.use(routesAuth);
app.use(routesUser);


app.listen(process.env.PORT);