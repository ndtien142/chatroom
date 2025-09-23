'use strict';

const express = require('express');
const { apiKey, permission } = require('../auth/checkAuth');
const router = express.Router();

// Check api key
router.use(apiKey);
router.use(permission('0000'));

router.use('/v1/api/auth', require('./access'));
router.use('/v1/api/chat', require('./chat'));
router.use('/v1/api/user', require('./user'));

module.exports = router;
