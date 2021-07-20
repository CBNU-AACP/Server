const { User, Member, AttendenceList, MemberList, CourseDate, } = require('../../../../models');

const updateAttendenceList = async(req,res,next) => {
  const { userId, validNum, courseDateId } = req.body;
  try {
    const user = await User.findOne({ where: {userId} });    
    if(user == null){
      return res.status(400).json({
        message: 'Can not find that user' //POST 요청이 실패했다는 의미로 400 상태와 함께 실패 메세지를 보낸다.
      })
    }
    else{
      
    }

  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = {updateAttendenceList};