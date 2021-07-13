const {Course, User} = require('../../../../models');

const createCourse = async(req,res,next)=>{
    const {body:{name},params:{userId}} = req;
    try {
        const user = await User.findOne({where:{userId}});
        if(!user) res.send("fail");
        let courseId = createCourseId(user.count, user.name);
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

const createCourseId = (count,courseName)=>{
    const date = new Date();
    let year = date.getFullYear().toString();       //현재 년도 받아오기
    let month = date.getMonth() + 1;                //현재 month 받아오기
    month = month < 10 ? '0' + month.toString() : month.toString();     //month를 2자리 수로 만들기
    let name = (courseName+"").charCodeAt(0);         //현재 과목명의 아스키코드 받아오기
    let milie = date.getMilliseconds().toString();      
    milie = milie.length >= 3 ? milie : new Array(4-milie.length).join("0")+milie;        //현재의 밀리세컨드를 받아오고 3자리가 될때까지 9을 붙여준다
    let expandCount = count < 10 ? '0' + count.toString() : count.toString();     //과목의 개수 받아오고 2자리 수로 만들기    
    return year + month + name + milie + expandCount;
}

module.exports = {createCourse, putCourse, deleteCourse};