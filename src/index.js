require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.STRING_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const routes = require('./routes');

app.use(express.json());
app.use(routes);


app.listen(process.env.PORT);