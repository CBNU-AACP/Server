const { Router } = require('express');
const controller = require('./controller');
const router = Router();
const { checkAttendance } = require('../../../../middlewares/checkAttendance');

router.patch('/attend', checkAttendance, controller.updateAttendance);

module.exports = router;