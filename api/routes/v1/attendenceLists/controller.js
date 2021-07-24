const { Member } = require('../../../../models');

const updateAttendenceList = async(req,res,next) => {
  const { userId } = req.body;
  try {
    const members = await res.locals.courseDate.getMembers();
    members.forEach(async function(value, index) { //함수 빼기 (메모리 누수!!! forEach 돌때마다 함수가 생김)
      try {           
        let checkAttendence = await value.getUsers({where: {userId: userId}});
        console.log(checkAttendence);
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