const express = require('express');
const router = express.Router();
const memberRouter = require('./members');
const courseRouter = require('./courses');
const userRouter = require('./users');

router.use('/members', memberRouter);
router.use('/courses', courseRouter);
router.use('/users', userRouter);

module.exports = router;