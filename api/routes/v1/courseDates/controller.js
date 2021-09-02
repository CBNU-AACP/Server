const {CourseDate, Course, Member} = require('../../../../models');
const { COURSE_NOT_FOUND, MEMBERLIST_NOT_FOUND } = require('../../../../errors/index');
const { createResponse } = require('../../../../utils/response');
const { Op } = require('sequelize');

const findOrCreateCourseDate = async(req,res,next)=>{
    const {params:{courseId}} = req;
    try {
        const course = await Course.findByPk(courseId);     //course를 먼저 찾아둔다
        if(!course) return next(COURSE_NOT_FOUND);
        const courseDateId = customCourseId(course.courseId);
        const courseDate = await CourseDate.findOrCreate({
            where:{courseDateId},
            defaults:{courseDateId}
        })

        const memberList = await course.getMemberList(); 
        const users = await memberList.getUsers();

        users.forEach(async element => {
          const checkDuplicatedUser = await element.getMembers({where: {courseDateId}});
          if(checkDuplicatedUser.length == 0) { //이미 똑같은 courseDateId로 각각의 User들에 대한 Member가 존재하는 경우에 대한 중복 방지를 위한 처리과정
            let member = await Member.create();
            await courseDate[0].addMember(member);
            await element.addMember(member);
            await memberList.addMember(member);
          }
        });
        return res.json(createResponse(res, courseDate));
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const customCourseId = (courseId) =>{
  const currentDate = getCurrentDate();
  return courseId + currentDate;
}

const getCurrentDate = () =>{
  const now = new Date();
  let month = now.getMonth()+1;
  month = month < 10 ? '0' + month.toString() : month.toString();
  let date = now.getDate();
  date = date < 10 ? '0' + date.toString() : date.toString();
  let hours = now.getHours();
  hours = hours < 10 ? '0' + hours.toString() : hours.toString();
  return month + date + hours; 
}

const getCourseDates = async(req,res,next) => { //여기서 memberList에서 삭제된 user들에 대한 db 삭제도 같이 이루어지는 것! (즉, 출석부 조회 할 때 무의미한 db가 삭제됌)
  const {params: {courseId}} = req;
  try {
    const course = await Course.findByPk(courseId);
    if(!course) next(COURSE_NOT_FOUND);
    const memberList = await course.getMemberList();
    if(!memberList) next(MEMBERLIST_NOT_FOUND);
    const notRealMembers = await memberList.getMembers();
    const users = await memberList.getUsers({attributes: ['userId']});
    const realUsers = await users.map(user => user.userId);

    for(const notRealMember of notRealMembers) {  //여기가 최근 멤버 리스트와 비교하면서 무의미한 member를 db에서 청소.
      const removedMember = await notRealMember.getUsers({where: {userId: {[Op.notIn]: realUsers}}});
      if(removedMember.length != 0)
        await Member.destroy({where: {id: notRealMember.id}});
    }
    res.json(createResponse(res));
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {findOrCreateCourseDate, getCourseDates};