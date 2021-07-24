const { Router } = require('express');
const controller = require('./controller');
const router = Router();
const { checkAttendence } = require('../../../../middlewares/checkAttendence');

router.patch('/attend', checkAttendence, controller.updateAttendenceList);

module.exports = router;