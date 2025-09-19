'use strict';

const conversationModel = require('../models/conversation.model');
const messageModel = require('../models/message.model');
const userModel = require('../models/user.model');
const { convertToObjectMongodb } = require('../utils');

class ChatService {
    // Get list conversation user participants
    static async getSidebarConversations({ userId, page = 1, limit = 20 }) {
        console.log('user id::', userId);
        const skip = (page - 1) * limit;
        const conversations = await conversationModel
            .find({
                'participants.userId': userId,
            })
            .populate('lastMessage', 'text sender createdAt')
            .sort({ updatedAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const totalConversations = await conversationModel.countDocuments({
            'participants.userId': userId,
        });
        const totalPages = Math.ceil(totalConversations / limit);
        return {
            items: conversations,
            meta: {
                totalPages,
                totalItems: +totalConversations,
                currentPage: +page,
                itemPerPage: +limit,
            },
        };
    }
    // Get list user
    static async getAllUser({ userId, page = 1, limit = 20 }) {
        const skip = (page - 1) * limit;
        return userModel
            .find({ _id: { $ne: convertToObjectMongodb(userId) } })
            .skip(skip)
            .limit(limit)
            .select('-password')
            .lean();
    }

    // find or create new conversation
    static async findOrCreatePrivate({ userId, recipientId }) {
        const foundConversation = await conversationModel.findOne({
            $and: [
                { type: 'direct' },
                {
                    'participants.userId': {
                        $all: [
                            convertToObjectMongodb(userId),
                            convertToObjectMongodb(recipientId),
                        ],
                    },
                },
                { participants: { $size: 2 } },
            ],
        });

        if (!foundConversation) {
            return await conversationModel.create({
                type: 'direct',
                participants: [
                    {
                        userId: convertToObjectMongodb(userId),
                        role: 'member',
                        joinedAt: new Date(),
                    },
                    {
                        userId: convertToObjectMongodb(recipientId),
                        role: 'member',
                        joinedAt: new Date(),
                    },
                ],
            });
        }
        return foundConversation;
    }
    // Get message
    static async getMessages({ conversationId, page = 1, limit = 20 }) {
        const skip = (page - 1) * limit;
        return messageModel
            .find({ conversationId: convertToObjectMongodb(conversationId) })
            .populate('sender', 'name username avatar')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();
    }

    // create new message
    static async createMessage({
        conversationId,
        senderId,
        text,
        attachments = [],
    }) {
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
