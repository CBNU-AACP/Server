const { Router } = require('express');
const controller = require('./controller');
const router = Router();

router.post('/register', controller.createUser);
router.post('/login', controller.createToken);
router.get('/userId/:value', controller.searchUser);

module.exports = router;
