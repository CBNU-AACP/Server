const { Router } = require('express');
const controller = require('./controller');
const router = Router();

router.get('/:courseId', controller.findOrCreateCourseDate);
router.get('/getCourseDates/:courseId', controller.getCourseDates);
router.put('/:courseDateId', controller.putCourseDates);

module.exports = router;
