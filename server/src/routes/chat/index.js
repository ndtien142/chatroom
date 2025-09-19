'use strict';

const express = require('express');
const asyncHandler = require('../../middleware/asyncHandler');
const chatController = require('../../controllers/chat.controller');
const { authentication } = require('../../auth/authUtils');
const router = express.Router();

router.use(authentication);

// Sidebar & user list
router.get('/conversations', asyncHandler(chatController.getSidebar));
router.get('/users', asyncHandler(chatController.getUsers));

// find or create conversation
router.post(
    '/conversations/private',
    asyncHandler(chatController.startPrivate),
);

// Messages
router.get(
    '/messages/:conversationId',
    asyncHandler(chatController.getMessages),
);
router.post('/messages', asyncHandler(chatController.sendMessage));
module.exports = router;
