'use strict';

require('dotenv').config();
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');

const { app, server } = require('./src/lib/socket.lib');

app.use(express.json());
app.use(
    cors({
        origin: ['http://localhost:5173'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    }),
);
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());

// Connect MongoDB
require('./src/dbs/init.mongodb');

// Routes
app.use('/', require('./src/routes'));

// Error handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        status: 'error',
        code: error.status || 500,
        message: error.message || 'Internal Server Error',
    });
});

const PORT = process.env.PORT || 3055;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

process.on('SIGINT', () => {
    server.close(() => {
        console.log('Server closed');
    });
});
