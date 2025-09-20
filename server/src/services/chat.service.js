'use strict';

const { NotFoundError } = require('../core/error.response');
const cloudinary = require('../lib/cloudinary.lib');
const { userSocketMap, io } = require('../lib/socket.lib');
const conversationModel = require('../models/conversation.model');
const messageModel = require('../models/message.model');
const userModel = require('../models/user.model');
const { convertToObjectMongodb } = require('../utils');

class ChatService {
    // Get list conversation user participants
    static async getSidebarConversations({ userId, page = 1, limit = 20 }) {
        const skip = (page - 1) * limit;
        const conversations = await conversationModel
            .find({
                'participants.userId': userId,
            })
            .skip(skip)
            .limit(limit)
            .sort({ updatedAt: -1 })
            .populate('lastMessage', 'content sender createdAt')
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
        if (conversationId == '')
            return NotFoundError('Not found conversation');
        const skip = (page - 1) * limit;
        console.log('page + limit', page, limit);
        const listMessage = await messageModel
            .find({ conversationId: convertToObjectMongodb(conversationId) })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .populate('senderId', 'name username avatar')
            .lean();
        const totalMessages = await messageModel.countDocuments({
            conversationId: convertToObjectMongodb(conversationId),
        });
        const totalPages = Math.ceil(totalMessages / limit);
        return {
            items: listMessage,
            meta: {
                totalPages,
                totalItems: +totalMessages,
                currentPage: +page,
                itemPerPage: +limit,
            },
        };
    }

    // create new message
    static async createMessage({ conversationId, senderId, text, file }) {
        let attachmentData = null;
        console.log('file::', file);
        if (file) {
            const uploadRes = await cloudinary.uploader.upload(file.path, {
                folder: 'chat_attachments',
                resource_type: 'auto',
            });

            console.log('res:::', uploadRes);

            attachmentData = {
                name: file.originalname,
                size: file.size,
                type: file.mimetype.startsWith('image') ? 'image' : 'file',
                url: uploadRes.secure_url,
            };
        }

        console.log('attachemntdata:::: ', attachmentData);

        const msg = await messageModel.create({
            conversationId: convertToObjectMongodb(conversationId),
            senderId: convertToObjectMongodb(senderId),
            content: text,
            attachment: attachmentData,
        });

        await conversationModel.findByIdAndUpdate(conversationId, {
            lastMessage: msg._id,
            updatedAt: new Date(),
        });

        // emit socket
        const conversation = await conversationModel
            .findById(conversationId)
            .populate('participants.userId', 'name username avatar')
            .lean();

        conversation.participants.forEach((p) => {
            const socketId = userSocketMap[p.userId._id];
            if (socketId) io.to(socketId).emit('receive_message', msg);
        });

        return msg;
    }
}

module.exports = ChatService;
