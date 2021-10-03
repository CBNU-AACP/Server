const { Router } = require('express');
const controller = require('./controller');
const router = Router();

router.get('/getAttendanceBook/:courseId', controller.getAttendanceBook);
router.put('/putAttendanceBook', controller.putAttendanceBook);

module.exports = router;