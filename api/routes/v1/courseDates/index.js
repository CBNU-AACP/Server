const { Router } = require('express');
const controller = require('./controller');
const router = Router();

router.get('/:courseId', controller.findOrCreateCourseDate);

module.exports = router;
