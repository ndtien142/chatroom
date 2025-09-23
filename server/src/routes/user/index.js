'use strict';

const express = require('express');
const userController = require('../../controllers/user.controller');
const asyncHandler = require('../../middleware/asyncHandler');
const { authentication } = require('../../auth/authUtils');
const multer = require('multer');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// authentication
router.use(authentication);

router.get('/list', asyncHandler(userController.getListUser));
router.get('/profile', asyncHandler(userController.getUserById));

router.post(
    '/',
    upload.single('avatar'),
    asyncHandler(userController.updateUserProfile),
);

module.exports = router;
