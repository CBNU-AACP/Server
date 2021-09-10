const { Course, CourseDate } = require('../../../../models');
const { createResponse } = require('../../../../utils/response');
const { MEMBER_NOT_FOUND, COURSE_NOT_FOUND, MEMBERLIST_NOT_FOUND, COURSEDATE_NOT_FOUND } = require('../../../../errors/index'); 
const { Op } = require('sequelize');

const updateAttendance = async (req, res, next) => {
  const { userId } = req.body;
  try {
    const members = await res.locals.courseDate.getMembers();
    for(const member of members) {
      const checkAttendance = await member.getUser({ where: { userId }});
      if(checkAttendance) {
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
          const check = await member.getUser({where: {studentId: user.studentId}});
          if(check) {
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

const putAttendanceBook = async (req,res,next) => {
  const datas = req.body.attendanceBook;
  try {
    for(const data of datas) {
      const courseDateId = data[0];
      const userId = data[1];
      const isChecked = data[2];
      const courseDate = await CourseDate.findAll({where: {courseDateId}});
      if(courseDate.length == 0) next(COURSEDATE_NOT_FOUND);
      const member = await courseDate[0].getMembers({where: {userId}});
      if(member.length == 0) next(MEMBER_NOT_FOUND);
      await member[0].update({isChecked});
    }
    res.json(createResponse(res));
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = { updateAttendance, getAttendanceBook, putAttendanceBook };
