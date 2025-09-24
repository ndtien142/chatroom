'use strict';

const { NotFoundError, BadRequestError } = require('../core/error.response');
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
            .populate({
                path: 'lastMessage',
                select: 'content senderId createdAt',
                populate: {
                    path: 'senderId',
                    select: 'name avatar email',
                },
            })
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

    static async getDetailConversation({ conversationId }) {
        if (!conversationId)
            throw new BadRequestError('Conversation ID is required');

        return await conversationModel
            .findById(conversationId)
            .populate({
                path: 'participants.userId',
                select: '_id name avatar email',
            })
            // populate thông tin last message
            .populate({
                path: 'lastMessage',
                select: 'content senderId createdAt',
                populate: {
                    path: 'senderId',
                    select: 'name avatar email',
                },
            })
            .populate({
                path: 'createdBy',
                select: '_id name avatar',
            })
            .lean();
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
    // create group chat
    static async createGroupChat({
        creatorId,
        name,
        memberIds = [],
        groupImage,
    }) {
        if (!name) throw new BadRequestError('Group name is required');
        let imageUrl = null;
        if (groupImage) {
            const uploadRes = await cloudinary.uploader.upload(
                groupImage.path,
                {
                    folder: 'chat_group',
                    resource_type: 'image',
                },
            );
            imageUrl = uploadRes.secure_url;
        }

        console.log('image', imageUrl);

        const memberSet = new Set(memberIds.map((id) => id.toString()));
        memberSet.add(creatorId.toString());

        const participants = [...memberSet].map((uid) => ({
            userId: convertToObjectMongodb(uid),
            role: uid === creatorId.toString() ? 'admin' : 'member',
            joinedAt: new Date(),
        }));

        const group = await conversationModel.create({
            type: 'group',
            name,
            groupImage: imageUrl,
            participants,
            avatar: imageUrl,
        });

        return group;
    }
    // Add member
    static async addMembers({ conversationId, userIds, requesterId }) {
        const conv = await conversationModel.findById(conversationId);
        if (!conv) throw new NotFoundError('Conversation not found');
        if (conv.type !== 'group')
            throw new BadRequestError('Not a group chat');

        const requester = conv.participants.find(
            (p) => p.userId.toString() === requesterId,
        );
        if (!requester || !['admin'].includes(requester.role)) {
            throw new BadRequestError('Not allowed to add members');
        }

        const existingIds = new Set(
            conv.participants.map((p) => p.userId.toString()),
        );
        const newMembers = userIds
            .filter((id) => !existingIds.has(id.toString()))
            .map((id) => ({
                userId: convertToObjectMongodb(id),
                role: 'member',
                joinedAt: new Date(),
            }));

        if (!newMembers.length) return conv;

        conv.participants.push(...newMembers);
        await conv.save();

        newMembers.forEach((m) => {
            const socketId = userSocketMap[m.userId];
            if (socketId)
                io.to(socketId).emit('added_to_group', { conversationId });
        });

        return conv;
    }
    static async removeMember({ conversationId, memberId, requesterId }) {
        const conv = await conversationModel.findById(conversationId);
        if (!conv) throw new NotFoundError('Conversation not found');
        if (conv.type !== 'group')
            throw new BadRequestError('Not a group chat');

        const requester = conv.participants.find(
            (p) => p.userId.toString() === requesterId,
        );
        if (!requester || !['admin'].includes(requester.role)) {
            throw new BadRequestError('Not allowed to remove members');
        }

        const beforeCount = conv.participants.length;
        conv.participants = conv.participants.filter(
            (p) => p.userId.toString() !== memberId.toString(),
        );
        if (conv.participants.length === beforeCount) {
            throw new NotFoundError('Member not found in group');
        }
        await conv.save();

        // Gửi socket notify
        const socketId = userSocketMap[memberId];
        if (socketId)
            io.to(socketId).emit('removed_from_group', { conversationId });

        return conv;
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

        const update = await conversationModel.findByIdAndUpdate(
            conversationId,
            {
                lastMessage: convertToObjectMongodb(msg._id),
                updatedAt: new Date(),
            },
        );
        console.log('update', update);

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
