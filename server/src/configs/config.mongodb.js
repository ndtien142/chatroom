const dev = {
    app: {
        port: process.env.PORT || 3055,
    },
    db: {
        uri: process.env.MONGO_URI || 'mongodb://localhost:27017/chattingDev',
    },
};

const pro = {
    app: {
        port: process.env.PORT || 3055,
    },
    db: {
        uri: process.env.MONGO_URI || 'mongodb://localhost:27017/chattingPro',
    },
};

const config = { dev, pro };
const env = process.env.NODE_ENV || 'dev';
module.exports = config[env];
