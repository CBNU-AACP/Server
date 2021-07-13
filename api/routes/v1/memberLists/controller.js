const {Member ,Course, MemberList} = require('../../../../models');

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
    const {params:{courseId}, body:{members}} = req; 
    try {
        const course = await Course.findByPk(courseId);
        const memberList = await course.getMemberList();        //memberList를 바로 가져오지않는 이유는 memberList의 아이디를 따로 클라쪽에서 저장하고 있어야하기 때문이다
        members.sort();     //다시 재정렬해준다
        const existed = await Promise.all(        //findByPk로 member를 동시에 착고 응답을 다 받으면 existed에 넣는다
            members.map((item)=>{
                return Member.findByPk(item);         
            })
        )
        const count = existed.length;     //response로 개수 정보도 함께 넘겨준다
        await memberList.addMembers(existed.map(item=>item));      //item에 다른 값들은 제외하고 memberId로 찾는다
        res.json({count});      
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const deleteMembers = async(req,res,next)=>{
        //body에 넣을지 query에 넣을지 고민해봐야함
}
module.exports = {createMemberList, enrollMembers};