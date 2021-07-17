const { Router } = require('express');
const controller = require('./controller');
const router = Router();

router.get('/single/:courseId', controller.getCourse);
router.get('/multiple/:userId', controller.getCourses);
router.get('/search/:userId', controller.searchCourse);
router.post('/:userId', controller.createCourse);
router.put('/:courseId', controller.putCourse);
router.delete('/single/:courseId', controller.deleteCourse);
router.delete('/multiple/:userId', controller.deleteCourses);

module.exports = router;
