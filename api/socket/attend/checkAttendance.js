const {User, CourseDate} = require('../../../models');

module.exports = async(userId, validNum, courseDateId) => {     //이전의 예외처리 미들웨어를 promise 반환형으로 변환
    return new Promise(async(resolve, reject)=>{
        try {
            const user = await User.findByPk(userId);
            if(!user) return reject("USER_NOT_FOUND");
            if(user.validNum != validNum) return reject("INVALID_QR_CODE");
            const courseDate = await CourseDate.findOne({where:{courseDateId}});
            if(!courseDate) return reject("INVALID_COURSE_DATE_ID");
            resolve(true);
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
}