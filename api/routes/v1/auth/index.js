const { Router } = require('express');
const controller = require('./controller');
const router = Router();

router.get('/sms/messages/:userId/:phone', controller.verifyCertificationInfo, controller.sendMessage);
router.get('/sms/compare/:userId', controller.compareCertificationKey);

module.exports = router;