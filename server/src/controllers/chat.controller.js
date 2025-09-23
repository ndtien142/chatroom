'use strict';

const { SuccessResponse } = require('../core/success.response');
const chatService = require('../services/chat.service');

class ChatController {
    // get list conversation
    getSidebar = async (req, res) => {
        const data = await chatService.getSidebarConversations({
            userId: req.userId,
            page: req.query.page,
            limit: req.query.limit,
        });
        new SuccessResponse({
            message: 'Get conversations success',
            metadata: data,
        }).send(res);
    };

    // get user to create new conversation
    getUsers = async (req, res) => {
        const data = await chatService.getAllUser({
            userId: req.userId,
            page: req.query.page,
            limit: req.query.limit,
        });
        new SuccessResponse({
            message: 'Get users success',
            metadata: data,
        }).send(res);
    };

    // find or create new conversation
    startPrivate = async (req, res) => {
        const { recipientId } = req.body;
        const data = await chatService.findOrCreatePrivate({
            userId: req.userId,
            recipientId,
        });
        new SuccessResponse({
            message: 'Start private chat success',
            metadata: data,
        }).send(res);
    };

    // get message from conversation
    getMessages = async (req, res) => {
        const { conversationId } = req.params;
        const data = await chatService.getMessages({
            conversationId,
            page: req.query.page,
            limit: req.query.limit,
        });
        new SuccessResponse({
            message: 'Get messages success',
            metadata: data,
        }).send(res);
    };

    // send message
    sendMessage = async (req, res) => {
        const { conversationId, text } = req.body;
        const file = req.file;

        console.log('req:::', req.file);

        const msg = await chatService.createMessage({
            conversationId,
            senderId: req.userId,
            text,
            file,
        });

        new SuccessResponse({
            message: 'Send message success',
            metadata: msg,
        }).send(res);
    };
    async createGroupChat(req, res, next) {
        const result = await chatService.createGroupChat({
            creatorId: req.userId,
            name: req.body.name,
            memberIds: req.body.memberIds || [],
            groupImage: req.file,
        });
        new SuccessResponse({
            message: 'Group created',
            metadata: result,
        }).send(res);
    }

    async addMembers(req, res, next) {
        const result = await chatService.addMembers({
            conversationId: req.params.id,
            userIds: req.body.userIds,
            requesterId: req.userId,
        });
        new SuccessResponse({
            message: 'Members added',
            metadata: result,
        }).send(res);
    }

    async removeMember(req, res, next) {
        const result = await chatService.removeMember({
            conversationId: req.params.id,
            memberId: req.params.memberId,
            requesterId: req.userId,
        });
        new SuccessResponse({
            message: 'Member removed',
            metadata: result,
        }).send(res);
    }
}

module.exports = new ChatController();
