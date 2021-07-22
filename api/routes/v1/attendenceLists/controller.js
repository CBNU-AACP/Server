const { User, Member, MemberList, CourseDate, Course, } = require('../../../../models');

const updateAttendenceList = async(req,res,next) => {
  const { userId, validNum, courseDateId } = req.body;
  try {
    const user = await User.findOne({ where: {userId} });    
    if(user == null){
      return res.status(400).json({
        message: 'Can not find that user' 
      })
    }

      if(user.validNum != validNum) { //사용자가 보내온 QR code가 유효하지 않은 경우
        return res.status(400).json({
        message: 'Invalid QR code' 
       })
      }

        const courseDate = await CourseDate.findByPk(courseDateId);
        const members = await courseDate.getMembers();

        members.forEach(async function(value, index) {
          try {           
            let checkAttendence = await value.getUsers({where: {userId: userId}});
            if(checkAttendence.length != 0)
            {
              const realMember = await Member.findByPk(value.id);
              realMember.update({isChecked: true});
              res.status(201).json({
                message: "attendance success"
              }); 
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

module.exports = {updateAttendenceList};