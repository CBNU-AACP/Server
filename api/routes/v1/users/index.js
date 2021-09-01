const { Router } = require('express');
const controller = require('./controller');
const router = Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/userId/:userId', controller.searchUserId);
router.get('/name/:userId', controller.searchUserName);
router.get('/check/:value', controller.isDuplicated);
router.get('/', controller.getUsers);
router.get('/:userId', controller.getSomeUsers);
router.put('/:userId', controller.putValidNum);
router.get('/sms/:phone', controller.sendMessage);

module.exports = router;
