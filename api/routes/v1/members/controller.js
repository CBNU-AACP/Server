const {User, Member} = require('../../../../models');

const createMember = async(req,res,next)=>{
    const {body, params:{userId}} = req;
    try {
        const user = await User.findOne({where:{userId}});
        const member = await Member.create(body);
        await user.setMember(member);
        res.json(member);
    } catch (error) {
        next(error);
    }
}

module.exports = {createMember}