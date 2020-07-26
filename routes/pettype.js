'use strict';
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const petType = require('../controllers/client/pettype');

router.get('/', petType.page);

module.exports = router;
