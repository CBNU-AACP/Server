const express = require('express');
const router = express.Router();
const memberRouter = require('./members');
const classRouter = require('./classes');

router.use('/members', memberRouter);
router.use('/classes', classRouter);

module.exports = router;