const {CourseDate, Course} = require('../../../../models');

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
        await course.addCourseDate(courseDateId);
        //여기서부터 courseDate와 attendenceList 관계 지어주는 코드
        const memberList = await course.getMemberList();  //넘겨받은 courseId로부터 찾은 course와 관계지어진 memberList를 찾는다.
        const attendenceList = await memberList.getAttendenceList();  //위에서 찾은 memberList와 관계지어진 attendenceList를 찾는다.
        await courseDate.setAttendenceList(attendenceList); //위에서 찾은 attendenceList과 여기서 생성한 courseDate와 관계를 지어준다.

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