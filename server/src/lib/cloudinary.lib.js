'use strict';

require('dotenv').config(); // load .env

const cloudinary = require('cloudinary').v2;

if (!cloudinary) {
    throw new Error('❌ Cloudinary module not loaded');
}

// Cấu hình
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Xuất ra cho nơi khác dùng
module.exports = cloudinary;
