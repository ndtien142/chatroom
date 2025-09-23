'use strict';

const mongoose = require('mongoose');
const {
    db: { uri },
} = require('../configs/config.mongodb');

class Database {
    constructor() {
        this.connect();
    }

    connect() {
        mongoose.set('debug', true);
        mongoose.set('debug', { color: true });

        console.log('uri:::', uri);

        mongoose
            .connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => console.log('Connected MongoDB Cloud Successfully'))
            .catch((err) => console.log('MongoDB connection error:', err));
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

const instanceMongoDb = Database.getInstance();

module.exports = instanceMongoDb;
