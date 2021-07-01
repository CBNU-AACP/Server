const express = require('express');
const router = express.Router();
const memberRouter = require('./members');
const classRouter = require('./classes');
const userRouter = require('./users');

router.use('/members', memberRouter);
router.use('/classes', classRouter);
router.use('/users', userRouter);

module.exports = router;