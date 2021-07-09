const { Router } = require('express');
const controller = require('./controller');
const router = Router();

router.post('/:userId', controller.createMember);

module.exports = router;
