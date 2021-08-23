const { Member } = require('../../../../models');
const { createResponse } = require('../../../../utils/response');
const { MEMBER_NOT_FOUND } = require('../../../../errors/index'); 

const updateAttendance = async (req, res, next) => {
  const { userId } = req.body;
  try {
    const members = await res.locals.courseDate.getMembers();
    for(const member of members) {
      const checkAttendance = await member.getUsers({ where: { userId }});
      if(checkAttendance.length != 0) {
        await member.update({ isChecked: true });
        return res.json(createResponse(res, member));
      }
    }
    next(MEMBER_NOT_FOUND);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = { updateAttendance };