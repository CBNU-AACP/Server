const { default: axios } = require('axios');
const {User, Member ,Course, MemberList} = require('../../../../models');
const { createResponse } = require('../../../../utils/response');
const { COURSE_NOT_FOUND, MEMBERLIST_NOT_FOUND } = require('../../../../errors/index');

require('dotenv').config();

const createMemberList = async(req,res,next)=>{
    const {params:{courseId}} = req;
    try {
        const course = await Course.findByPk(courseId);
        const memberList = await MemberList.create();
        await course.setMemberList(memberList);
        res.json(memberList);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const enrollMembers = async(req,res,next)=>{
    const SERVER_URL = process.env.SERVER_URL;
    const {params:{courseId}, body:{members}} = req; 
    try {
        const course = await Course.findByPk(courseId);
        let memberList = await course.getMemberList();        //memberList를 바로 가져오지않는 이유는 memberList의 아이디를 따로 클라쪽에서 저장하고 있어야하기 때문이다
        if(!memberList) memberList = await axios.get(`${SERVER_URL}/v1/memberLists/${courseId}`);
        members.sort();     //다시 재정렬해준다
        const existed = await Promise.all(        //findByPk로 user를 동시에 착고 응답을 다 받으면 existed에 넣는다
            members.map((item)=>{
              return User.findByPk(item);   
            })
        )
        await memberList.setUsers(existed.map(item=>item));      //최근에 들어온 배열로 덮어씌우기 위함
        res.json(createResponse(res, existed));      
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const searchUsers = async(req, res, next) => {
  const {params: {courseId}} = req;
  try {
    const course = await Course.findByPk(courseId);
    if(!course) next(COURSE_NOT_FOUND);
    const memberList = await course.getMemberList();
    if(!memberList) next(MEMBERLIST_NOT_FOUND);
    const users = await memberList.getUsers({attributes: ['userId', 'name', 'studentId']});
    res.json(createResponse(res, users));
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteMembers = async(req,res,next)=>{
        //body에 넣을지 query에 넣을지 고민해봐야함
}
module.exports = {createMemberList, enrollMembers, searchUsers};