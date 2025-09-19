'use strict';

const conversationModel = require('../models/conversation.model');
const messageModel = require('../models/message.model');
const userModel = require('../models/user.model');
const { convertToObjectMongodb } = require('../utils');

class ChatService {
    // Get list conversation user participants
    async getSidebarConversations({ userId, page = 1, limit = 20 }) {
        const skip = (page - 1) * limit;
        return conversationModel
            .find({ participants: convertToObjectMongodb(userId) })
            .populate('lastMessage', 'text sender createdAt')
            .sort({ updatedAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();
    }
    // Get list user
    async getAllUser({ userId, page = 1, limit = 20 }) {
        const skip = (page - 1) * limit;
        return userModel
            .find({ _id: { $ne: convertToObjectMongodb(userId) } })
            .skip(skip)
            .limit(limit)
            .select('-password')
            .lean();
    }

    // find or create new conversation
    async findOrCreatePrivate({ userId, recipientId }) {
        const foundConversation = await conversationModel.findOne({
            type: 'private',
            participants: {
                $all: [
                    convertToObjectMongodb(userId),
                    convertToObjectMongodb(recipientId),
                ],
                $size: 2,
            },
        });

        if (!foundConversation) {
            return await conversationModel.create({
                type: 'private',
                participants: [
                    convertToObjectMongodb(userId),
                    convertToObjectMongodb(recipientId),
                ],
            });
        }
        return foundConversation;
    }
    // Get message
    async getMessages({ conversationId, page = 1, limit = 20 }) {
        const skip = (page - 1) * limit;
        return messageModel
            .find({
                conversationId: convertToObjectMongodb(conversationId),
            })
            .populate('sender', 'name username avatar')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();
    }

    // create new message
    async createMessage({ conversationId, senderId, text, attachments = [] }) {
        const msg = await messageModel.create({
            conversationId: convertToObjectMongodb(conversationId),
            sender: convertToObjectMongodb(senderId),
            text,
            attachments,
        });

        // update lastMessage and updatedAt
        await conversationModel.findByIdAndUpdate(conversationId, {
            lastMessage: msg._id,
            updatedAt: new Date(),
        });

        return msg;
    }
}

module.exports = ChatService;
