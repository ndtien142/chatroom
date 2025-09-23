'use strict';

const { CREATED, SuccessResponse } = require('../core/success.response');
const userService = require('../services/user.service');

class AccessController {
    getListUser = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get list user successfully',
            metadata: await userService.getListUser({
                ...req.query,
                userId: req.userId,
            }),
        }).send(res, {
            'Content-Type': 'application/json',
        });
    };
    getUserById = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get user successfully',
            metadata: await userService.getUserById(req.userId),
        }).send(res, {
            'Content-Type': 'application/json',
        });
    };
    updateUserProfile = async (req, res, next) => {
        new CREATED({
            message: 'Get user successfully',
            metadata: await userService.updateProfile(req.userId, {
                file: req.file,
            }),
        }).send(res, {
            'Content-Type': 'application/json',
        });
    };
}

module.exports = new AccessController();
