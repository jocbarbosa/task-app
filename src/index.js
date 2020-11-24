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

app.use((req, res, next) => {
    if (process.env.MAINTENANCE === 'true') {
        return res.status(503).json({ message: 'The service are on maintenance. Try later.' });
    } else {
        next();
    }
});

app.use(express.json());
app.use(routesTask);
app.use(routesAuth);
app.use(routesUser);


app.listen(process.env.PORT);