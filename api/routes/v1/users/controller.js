const {User} = require('../../../../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const YOUR_SECRET_KEY = process.env.SECRET_KEY;

const createToken = async function(req, res, next) {
  const { userId, userPassword } = req.body;
  try {
    const user = await User.findOne({ where: {userId} });
    if(user == null){
      res.status(400).json({
        message: 'fail' //POST 요청이 실패했다는 의미로 400 상태와 함께 실패 메세지를 보낸다.
      })
    }
    else{
      bcrypt.compare(userPassword, user.userPassword, function(err, res2) {
        if(res2===true)
        {
          const token = jwt.sign({
          userId: user.userId
          }, YOUR_SECRET_KEY, {
          expiresIn: '1h'
          });
          res.cookie('user', token);  //client 쿠키쪽에 user라는 이름의 토큰 값을 쿠키로 저장!
          res.status(201).json({  //POST 요청이 성공했다는 의미로 201 상태와 함께 성공 메세지와 token을 보낸다.
          message: 'success',
          message2: 'login success',
          token
          });
        } else {
          res.status(400).json({
          message: 'fail', //POST 요청이 실패했다는 의미로 400 상태와 함께 실패 메세지를 보낸다.
          message2: 'login fail'
          })
        }
      })
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};


const createUser = async function(req, res, next) {
  try {
    const saltRounds = 10;
    const user = await User.findOne({where: { userId: req.body.userId }})
    if(user) {  //userId 중복 걸러주기.
      res.status(400).json({
        message: 'fail', //POST 요청이 실패했다는 의미로 400 상태와 함께 실패 메세지를 보낸다.
        message2: 'Duplicated userId'
      })
    }
    else {
      const newUser = await User.create(req.body);
      bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) return next(err);
        bcrypt.hash(newUser.userPassword, salt, function(err, hash) {
          if(err) return next(err);
          newUser.update({ userPassword: hash })
        });
      });
      res.status(201).json({  //회원 가입에 성공하면 201 상태와 함께 성공 메세지를 보낸다.
        message: 'success',
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {createUser, createToken}