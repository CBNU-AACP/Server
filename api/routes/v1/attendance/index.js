const { Router } = require('express');
const controller = require('./controller');
const router = Router();
const { checkAttendance } = require('../../../../middlewares/checkAttendance');

router.patch('/attend', checkAttendance, controller.updateAttendance);
router.get('/getAttendanceBook/:courseId', controller.getAttendanceBook);
router.put('/putAttendanceBook', controller.putAttendanceBook);

module.exports = router;