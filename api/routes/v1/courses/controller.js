const {Course, User, MemberList} = require('../../../../models');
const {Op} = require('sequelize');
const { createResponse } = require('../../../../utils/response');
const { COURSE_NOT_FOUND, USER_NOT_FOUND } = require('../../../../errors/index');

const getCourse = async(req,res,next)=>{
    const {params:{courseId}} = req;
    try {
        const course = await Course.findByPk(courseId,{attributes:['name','courseId', 'description','createdAt']});
        if(!course) next(COURSE_NOT_FOUND);
        res.json(createResponse(res, course));
    } catch (error) {
        console.error(error);
        next(error);    
    }
}

const getCourses = async(req,res,next)=>{
    const {params:{userId}} = req;
    try {
        const user = await User.findByPk(userId);
        if(!user) next(USER_NOT_FOUND);
        const courses = await user.getCourses({attributes:['name','courseId', 'description','createdAt'],order:['name']});
        res.json(createResponse(res, courses));
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const createCourse = async(req,res,next)=>{
    const {body:{name, description},params:{userId}} = req;
    try {
        const user = await User.findByPk(userId);
        if(!user) next(USER_NOT_FOUND);
        let courseId = createCourseId(user.courseCount, user.name);
        const course = await Course.create({name,courseId,description,userId});       //body에는 name만 담기게 된다
        res.json(createResponse(res, course));
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const putCourse = async(req,res,next)=>{
    const {params:{courseId}, body} = req;
    try {
        const course = await Course.findByPk(courseId);
        if(!course) next(COURSE_NOT_FOUND);
        const updatedCourse = await course.update(body);
        res.json(createResponse(res, updatedCourse));
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const deleteCourses = async(req,res,next)=>{
    const {params:{userId}} = req;
    try {
        const user = await User.findByPk(userId);
        if(!user) next(USER_NOT_FOUND);
        await Course.destroy({where:{userId}});
        res.json(createResponse(res));
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const deleteCourse = async(req,res,next)=>{
    const {params:{courseId}} = req;
    try {
        const course = await Course.findByPk(courseId);
        if(!course) next(COURSE_NOT_FOUND);
        await course.destroy();
        res.json(createResponse(res));
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const searchCourse = async(req,res,next)=>{
    const {params:{userId}, query:{value}} = req;
    try {
        const user = await User.findByPk(userId);
        if(!user) next(USER_NOT_FOUND);
        let decodedValue = decodeURIComponent(value);       //한글이 넘어오는 것을 고려해서 
        const course = await user.getCourses(
            {where:{name:{[Op.like]:"%"+decodedValue+"%"}},
            attributes:['name','courseId', 'description','createdAt']});
        res.json(createResponse(res, course));       
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

module.exports = {createCourse, putCourse, deleteCourse, deleteCourses, getCourses, getCourse, searchCourse};