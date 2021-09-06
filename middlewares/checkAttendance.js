const { User, CourseDate } = require("../models");
const { USER_NOT_FOUND, INVALID_QR_CODE, INVALID_COURSE_DATE_ID } = require('../errors/index');

const checkAttendance = async (req, res, next) => {
  const { userId, validNum, courseDateId } = req.body;
  const user = await User.findByPk(userId);
  try {
    if (!user)
      next(USER_NOT_FOUND);
    if (user.validNum != validNum)  //사용자가 보내온 QR code가 유효하지 않은 경우
      next(INVALID_QR_CODE);
    const courseDate = await CourseDate.findAll({where: {courseDateId}});
    if (!courseDate) 
      next(INVALID_COURSE_DATE_ID);
    res.locals.courseDate = courseDate[0];
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.checkAttendance = checkAttendance;