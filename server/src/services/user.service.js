'use strict';

const cloudinary = require('../lib/cloudinary.lib');
const userModel = require('../models/user.model');

class UserService {
    static async getListUser({ searchText, userId, page = 1, limit = 20 }) {
        const regex = new RegExp(searchText, 'i');
        const skip = (page - 1) * limit;
        const listUser = await userModel
            .find(
                {
                    _id: { $ne: userId },
                    $or: [
                        { username: { $regex: regex } },
                        { name: { $regex: regex } },
                    ],
                },
                { password: 0 },
            )
            .skip(skip)
            .lean();
        return {
            items: listUser,
        };
    }
    static async getUserById(userId) {
        return await userModel.findById(userId).select('-password').lean();
    }
    static async updateProfile(userId, { file, avatar }) {
        if (file) {
            const uploadRes = await cloudinary_js_config.uploader.upload(
                file.path,
                {
                    folder: 'chat_attachments',
                    resource_type: 'auto',
                },
            );
            return await userModel.findByIdAndUpdate(
                userId,
                {
                    $set: {
                        avatar: uploadRes.secure_url,
                    },
                },
                { new: true, select: '-password' },
            );
        }
    }
}

module.exports = UserService;
