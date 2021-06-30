const {User} = require('../../../../models');

const createUser = async(req,res,next)=>{
    const {body} = req;
    try {
        const user = await User.create(body);
        res.json({message: 'success'});
    } catch (error) {
        next(error);
    }
}

const logIn = async(req,res,next)=>{
    const {userId, userPassword} = req.body;
    try {
        const user = await User.findOne({ where: {userId, userPassword} })
        if(user == null)
        {
          res.json({message: 'fail'});
        }
        else{
          res.json({message: 'success'});
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {createUser, logIn}