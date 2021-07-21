const { User, Member, AttendenceList, MemberList, CourseDate, Course, } = require('../../../../models');

const updateAttendenceList = async(req,res,next) => {
  const { memberId, validNum, courseDateId } = req.body;
  try {
    const member = await Member.findOne({ where: {memberId} });    
    if(member == null){
      return res.status(400).json({
        message: 'Can not find that member' //POST 요청이 실패했다는 의미로 400 상태와 함께 실패 메세지를 보낸다.
      })
    }
    else{
      const courseDate = await CourseDate.findByPk(courseDateId);
      const course = await Course.findAll({
        where: {
          courseId: courseDate.courseId
        }
      });
      const memberList = await course.getMemberList();
      const members = await memberList.getMembers();
      const member = await user.getMember();
      const attendedMember = await members.findOne({ where: {memberId: member.memberId} });  //이거 가능한 부분인지??? 질문!!! 왜냐하면 여기서 members는 배열인 것 같아서!!!
    }

  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = {updateAttendenceList};