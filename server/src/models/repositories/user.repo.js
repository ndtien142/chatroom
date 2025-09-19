'use strict';

const userModel = require('../user.model');

const findUserByUsername = async ({
    username,
    select = {
        name: 1,
        username: 1,
        roles: 1,
        password: 1,
    },
}) => {
    return await userModel.findOne({ username }, select).lean();
};

module.exports = {
    findUserByUsername,
};
