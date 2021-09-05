const { Course, CourseDate } = require('../../../../models');
const { createResponse } = require('../../../../utils/response');
const { MEMBER_NOT_FOUND, COURSE_NOT_FOUND, MEMBERLIST_NOT_FOUND, COURSEDATE_NOT_FOUND } = require('../../../../errors/index'); 
const { Op } = require('sequelize');

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

const getAttendanceBook = async (req,res,next) => {
  const {params: {courseId}} = req;
  try {
    let attendanceBook = [];
    const course = await Course.findByPk(courseId);
    if(!course) next(COURSE_NOT_FOUND);
    const memberList = await course.getMemberList();
    if(!memberList) next(MEMBERLIST_NOT_FOUND);
    const users = await memberList.getUsers({attributes: ['name', 'studentId', 'userId'], order: [['name', 'ASC']]}); //이름 가나다 순으로 정렬된 users
    attendanceBook.push(users);
    const courseDates = await CourseDate.findAll({where: {courseDateId: {[Op.like]: courseId+"%"}}, order: [['courseDateId', 'ASC']]});
    if(courseDates.length == 0)
      next(COURSEDATE_NOT_FOUND);
    for(const courseDate of courseDates) {
      const members = await courseDate.getMembers();
      let isCheckeds = [];
      for(const user of users) {
        for(const member of members) {
          const check = await member.getUsers({where: {studentId: user.studentId}});
          if(check.length != 0) {
            isCheckeds.push(member.isChecked);
            break;
          }
        }
      }
      attendanceBook.push(isCheckeds);
    }  
    res.json(createResponse(res, attendanceBook));
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = { updateAttendance, getAttendanceBook };