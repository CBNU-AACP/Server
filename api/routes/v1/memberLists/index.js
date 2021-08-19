const { Router } = require('express');
const controller = require('./controller');
const router = Router();

router.get('/:courseId', controller.createMemberList);
router.post('/:courseId', controller.enrollMembers);
router.delete('/:courseId', controller.deleteMember);

module.exports = router;
