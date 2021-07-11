const {User} = require('../../../../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const YOUR_SECRET_KEY = process.env.SECRET_KEY;

const createToken = async function(req, res, next) {
  const { userId, userPassword } = req.body;
  try {
    const user = await User.findOne({ where: {userId, userPassword} })
    if(user == null){
      res.status(400).json({
        message: 'fail' //POST 요청이 실패했다는 의미로 400 상태와 함께 실패 메세지를 보낸다.
      })
    }
    else{
      const token = jwt.sign({
        userId: user.userId
      }, YOUR_SECRET_KEY, {
        expiresIn: '1h'
      });

      res.cookie('user', token);  //client 쿠키쪽에 user라는 이름의 토큰 값을 쿠키로 저장!
      res.status(201).json({  //POST 요청이 성공했다는 의미로 201 상태와 함께 성공 메세지와 token을 보낸다.
        message: 'success',
        token
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};


const createUser = async function(req, res, next) {
  try {
    const user = await User.create(req.body);
    res.status(201).json({  //회원 가입에 성공하면 201 상태와 함께 성공 메세지를 보낸다.
      message: 'success'
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {createUser, createToken}