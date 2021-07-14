const {CourseDate, Course} = require('../../../../models');

const findOrCreateCourseDate = async(req,res,next)=>{
    const {params:{courseId}} = req;
    try {
        const course = await Course.findByPk(courseId);     //course를 먼저 찾아둔다
        if(!course) return res.send("course not existed");
        const courseDateId = customCourseId(course.courseId);
        const {courseDate, created} = await CourseDate.findOrCreate({
            where:{courseDateId},
            defaults:{courseDateId}
        })
        await course.addCourseDate(courseDateId);
        res.json(created);
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
    return month+date; 
}

module.exports = {findOrCreateCourseDate};