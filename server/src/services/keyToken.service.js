'use strict';

const keyTokenModel = require('../models/keyToken.model');

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, refreshToken }) => {
        try {
            const tokens = await keyTokenModel.findOneAndUpdate(
                {
                    user: userId,
                },
                {
                    refreshTokenUsed: [],
                    publicKey: publicKey.toString(),
                    refreshToken: refreshToken || '',
                },
                {
                    new: true,
                    upsert: true,
                },
            );

            return tokens ? tokens.publicKey : null;
        } catch (error) {
            return error;
        }
    };

    static findByUserId = async (userId) => {
        return await keyTokenModel.findOne({ user: userId }).lean();
    };

    static removeKeyById = async (id) => {
        return await keyTokenModel.deleteOne({ _id: id });
    };
}

module.exports = KeyTokenService;
