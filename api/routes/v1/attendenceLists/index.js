const { Router } = require('express');
const controller = require('./controller');
const router = Router();

router.patch('/attend', controller.updateAttendenceList);

module.exports = router;