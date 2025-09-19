'use strict';

const { CREATED } = require('../core/success.response');
const AccessService = require('../services/access.service');

class AccessController {
    signUp = async (req, res, next) => {
        new CREATED({
            message: 'User created successfully',
            metadata: await AccessService.signUp(req.body),
        }).send(res, {
            'Content-Type': 'application/json',
        });
    };
    login = async (req, res, next) => {
        new CREATED({
            message: 'User login successfully',
            metadata: await AccessService.login(req.body),
        }).send(res, {
            'Content-Type': 'application/json',
        });
    };
    logout = async (req, res, next) => {
        new CREATED({
            message: 'User logout successfully',
            metadata: await AccessService.logout({ keyStore: req.keyStore }),
        }).send(res, {
            'Content-Type': 'application/json',
        });
    };
}

module.exports = new AccessController();
