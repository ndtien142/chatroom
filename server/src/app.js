require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const { default: helmet } = require('helmet');
const compression = require('compression');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'X-Requested-With',
            'X-User-Id',
            'X-Api-Key',
            'lang',
        ],
    }),
);

app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use(helmet());
app.use(compression());

require('./dbs/init.mongodb');

// init routes
app.use('/', require('./routes'));

// handling error
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        status: 'error',
        code: error.status || 500,
        message: error.message || 'Internal Server Error',
    });
});

module.exports = app;
