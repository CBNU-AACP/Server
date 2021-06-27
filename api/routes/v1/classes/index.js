const { Router } = require('express');
const controller = require('./controller');
const router = Router();

router.post('/', controller.createClass);

module.exports = router;
