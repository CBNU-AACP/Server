const {Member} = require('../../../../models');

const createMember = async(req,res,next)=>{
    const {body} = req;
    try {
        const member = await Member.create(body);
        res.json(member);
    } catch (error) {
        next(error);
    }
}

module.exports = {createMember}