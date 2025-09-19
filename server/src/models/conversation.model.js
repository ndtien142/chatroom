'use strict';

const { Schema, model } = require('mongoose');

const DOCUMENT_NAME = 'Conversation';
const COLLECTION_NAME = 'Conversations';

const conversationSchema = new Schema(
    {
        type: {
            type: String,
            enum: ['direct', 'group'],
            required: true,
            default: 'direct',
        },
        // For group chat
        name: {
            type: String,
            trim: true,
        },
        avatar: {
            type: String,
            default: '',
        },
        participants: [
            {
                userId: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                    required: true,
                },
                role: {
                    type: String,
                    enum: ['member', 'admin'],
                    default: 'member',
                },
                joinedAt: { type: Date, default: Date.now },
                // calc unread
                lastReadMessage: {
                    type: Schema.Types.ObjectId,
                    ref: 'Message',
                },
            },
        ],
        lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
        nameLastUserSent: { type: String },
        createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);

conversationSchema.index({ type: 1 });
conversationSchema.index({ 'participants.userId': 1 });

module.exports = model(DOCUMENT_NAME, conversationSchema);
