const { User, CourseDate } = require("../models");

const checkAttendence = async (req,res,next) => {
  const {userId, validNum, courseDateId} = req.body;
  const user = await User.findByPk(userId);
  if(user == null) {
    return res.status(400).json({
      message: 'Can not find that user'
    });
  }
  if(user.validNum != validNum) { //사용자가 보내온 QR code가 유효하지 않은 경우
    return res.status(400).json({
      message: 'Invalid QR code' 
    });
  }
  const courseDate = await CourseDate.findByPk(courseDateId);
  if(courseDate == null) {
    return res.status(400).json({
      message: 'Invalid courseDateId'
    });
  }  
  res.locals.courseDate = courseDate;
  next();
}; 

exports.checkAttendence = checkAttendence;