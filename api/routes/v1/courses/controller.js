const {Course, User} = require('../../../../models');

const createCourse = async(req,res,next)=>{
    const {body:{name},params:{userId}} = req;
    try {
        const user = await User.findOne({where:{userId}});
        if(!user) res.send("fail");
        let courseId = calcCourseId(user.count, userId);
        const course = await Course.create({name,courseId,userId});       //body에는 name만 담기게 된다
        await user.addCourse(course);
        res.json(course);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const putCourse = async(req,res,next)=>{
    const {params:{courseId}, body} = req;
    try {
        const course = await Course.findByPk(courseId);
        if(!course) return res.send("not existed");
        const updatedCourse = await course.update(body);
        res.json(updatedCourse);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const deleteCourse = async(req,res,next)=>{
    const {params:{courseId}} = req;
    try {
        const course = await Course.findByPk(courseId);
        if(!course) return res.send("not existed");
        await course.destroy();
        res.json(course);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const calcCourseId = (count,userId)=>{
    let date = new Date();
    let month = date.getMonth()+1;
    if(month/10 == 0) month = "0" + month;
    let transCount = count;
    for(let i = 10; i< 1000; i*=10){
        if(count/i == 0) transCount = "0" + transCount;
    }
    let result = date.getFullYear()+""+month+""+count+"_"+userId;
    return result;
}

module.exports = {createCourse, putCourse, deleteCourse};