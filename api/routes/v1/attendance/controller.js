const { Member } = require('../../../../models');
const { createResponse } = require('../../../../utils/response');

const updateAttendance = async (req, res, next) => {
  const { userId } = req.body;
  try {
    const members = await res.locals.courseDate.getMembers();
    members.forEach(async function (value) { //함수 빼기 (메모리 누수!!! forEach 돌때마다 함수가 생김)
      try {
        let checkAttendance = await value.getUsers({ where: { userId: userId } });
        if (checkAttendance.length != 0) {
          const realMember = await Member.findByPk(value.id);
          realMember.update({ isChecked: true });
          res.json(createResponse(res, realMember));
          return true;
        }
      } catch (error) {
        console.error(error);
        next(error);
      }
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = { updateAttendance };