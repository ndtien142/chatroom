'use strict';

const { Schema, model } = require('mongoose');

const DOCUMENT_NAME = 'Message';
const COLLECTION_NAME = 'Messages';

const messageSchema = new Schema(
    {
        conversationId: {
            type: Schema.Types.ObjectId,
            ref: 'Conversation',
            required: true,
            index: true,
        },
        senderId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        content: {
            type: String,
            trim: true,
        },
        attachments: [
            {
                type: {
                    type: String,
                    enum: ['image', 'file', 'video', 'audio'],
                },
                url: String,
                size: Number,
                name: String,
            },
        ],
        reactions: [
            {
                userId: { type: Schema.Types.ObjectId, ref: 'User' },
                emoji: String,
                reactedAt: { type: Date, default: Date.now },
            },
        ],
        readBy: [
            {
                userId: { type: Schema.Types.ObjectId, ref: 'User' },
                emoji: String,
                readAt: { type: Date, default: Date.now },
            },
        ],
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);

// support pagination
messageSchema.index({ conversationId: 1, createdAt: -1 });

module.exports = model(DOCUMENT_NAME, messageSchema);
