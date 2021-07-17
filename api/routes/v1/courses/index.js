const { Router } = require('express');
const controller = require('./controller');
const router = Router();

router.get('/single/:courseId', controller.getCourse);
router.get('/multiple/:userId', controller.getCourses);
router.post('/:userId', controller.createCourse);
router.put('/:courseId', controller.putCourse);
router.delete('/:courseId', controller.deleteCourse);

module.exports = router;
