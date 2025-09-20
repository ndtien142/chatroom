'use strict';
const { Server } = require('socket.io');
const http = require('http');
const express = require('express');
const conversationModel = require('../models/conversation.model');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

const userSocketMap = {}; // { userId: socketId }

io.on('connection', async (socket) => {
    const { userId } = socket.handshake.auth;
    if (!userId) return;
    console.log('User connected:', userId);

    userSocketMap[userId] = socket.id;
    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    const conversations = await conversationModel.find({
        'participants.userId': userId,
    });
    conversations.forEach((conv) => socket.join(conv._id.toString()));

    socket.on('sendMessage', async (data) => {});

    socket.on('disconnect', () => {
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
        console.log('User disconnected:', userId);
    });
});

module.exports = { io, app, server, userSocketMap };
