'use strict';

const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData, generateKeyPairSync } = require('../utils');
const { BadRequestError } = require('../core/error.response');
const { findUserByUsername } = require('../models/repositories/user.repo');

class AccessService {
    static signUp = async ({ name, username, password }) => {
        // Logic for signing up the user
        // Step 1: check email existed?
        const existedUser = await userModel
            .findOne({
                username,
            })
            .lean();
        // lean converts the document to a plain JavaScript object
        if (existedUser) {
            throw new BadRequestError('Error: Email already registered');
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            name,
            username,
            password: passwordHash,
            roles: [],
        });

        if (newUser) {
            // created private key, publicKey
            const { privateKey, publicKey } = await generateKeyPairSync({
                algorithm: 'rsa',
            });

            const publicKeyString = await KeyTokenService.createKeyToken({
                userId: newUser._id,
                publicKey,
            });

            if (!publicKeyString) {
                throw new BadRequestError('Error: KeyTokenService error');
            }

            const publicKeyObject = crypto.createPublicKey(publicKeyString);

            // Step 3: create token pair
            // Create token pair
            const tokens = await createTokenPair(
                { userId: newUser._id, username },
                publicKeyObject,
                privateKey,
            );

            return {
                code: 201,
                user: getInfoData({
                    field: ['_id', 'name', 'username', 'avatar'],
                    object: newUser,
                }),
                tokens,
            };
        }

        return {
            code: 200,
            metadata: null,
        };
    };
    static login = async ({ username, password, refreshToken = null }) => {
        // Step 1: check username existed?
        const existedUser = await findUserByUsername({ username });
        if (!existedUser) {
            throw new BadRequestError('User not registered');
        }
        // Step 2: check password
        const match = await bcrypt.compare(password, existedUser.password);
        if (!match) {
            throw new BadRequestError('Password is incorrect');
        }
        // Step 2: create publicKey, privateKey
        const { privateKey, publicKey } = await generateKeyPairSync({
            algorithm: 'rsa',
        });

        const publicKeyString = await KeyTokenService.createKeyToken({
            userId: existedUser._id,
            publicKey,
            refreshToken,
        });

        if (!publicKeyString) {
            throw new BadRequestError('Error: KeyTokenService error');
        }

        const publicKeyObject = crypto.createPublicKey(publicKeyString);
        // Step 3: create token pair
        const tokens = await createTokenPair(
            { userId: existedUser._id, username },
            publicKeyObject,
            privateKey,
        );

        return {
            code: 200,
            user: getInfoData({
                field: ['_id', 'name', 'username', 'avatar'],
                object: existedUser,
            }),
            tokens,
        };
    };
    static logout = async ({ keyStore }) => {
        // remove refreshToken in db
        const removeToken = await KeyTokenService.removeKeyById(keyStore._id);
        console.log('removeToken::', removeToken);
        return removeToken;
    };
}

module.exports = AccessService;
