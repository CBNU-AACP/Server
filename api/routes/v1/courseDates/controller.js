const {CourseDate, Course, Member} = require('../../../../models');

const findOrCreateCourseDate = async(req,res,next)=>{
    const {params:{courseId}} = req;
    try {
        const course = await Course.findByPk(courseId);     //course를 먼저 찾아둔다
        if(!course) return res.send("course not existed");
        const courseDateId = customCourseId(course.courseId);
        const courseDate = await CourseDate.findOrCreate({
            where:{courseDateId},
            defaults:{courseDateId}
        })

        const memberList = await course.getMemberList(); 
        const users = await memberList.getUsers();

        users.forEach(async element => {
          let member = await Member.create();
          await courseDate[0].addMember(member);
          await element.addMember(member);
          await memberList.addMember(member);
        });

        res.json(courseDate);
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
    const month = (now.getMonth()+1).toString();
    const date = now.getDate().toString();
    const hours = now.getHours().toString();
    return month+date+hours; 
}

module.exports = {findOrCreateCourseDate};