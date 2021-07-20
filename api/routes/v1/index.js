const express = require('express');
const router = express.Router();
const memberRouter = require('./members');
const courseRouter = require('./courses');
const userRouter = require('./users');
const memberListRouter = require('./memberLists');
const attendenceListRouter = require('./attendenceLists');
const courseDateRouter = require('./courseDates');

router.use('/members', memberRouter);
router.use('/courses', courseRouter);
router.use('/users', userRouter);
router.use('/memberLists', memberListRouter);
router.use('/attendenceLists', attendenceListRouter);
router.use('/courseDates', courseDateRouter);

module.exports = router;