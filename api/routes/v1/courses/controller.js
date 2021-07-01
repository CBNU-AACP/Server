const {Course} = require('../../../../models');

const createClass = async(req,res,next)=>{
    const {body} = req;
    try {
        const lecture = await Class.create(body);
        res.json(lecture);
    } catch (error) {
        next(error);
    }
}

module.exports = {createClass}