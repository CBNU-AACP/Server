const { Router } = require('express');
const controller = require('./controller');
const router = Router();

router.post('/register', controller.createUser);
router.post('/login', controller.createToken);
router.get('/userId/:value', controller.searchUserId);
router.get('/name/:value', controller.searchUserName);
router.get('/', controller.getUsers);
router.get('/:userId', controller.getSomeUsers)

module.exports = router;
