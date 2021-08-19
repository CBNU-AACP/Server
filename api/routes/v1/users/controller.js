const {User} = require('../../../../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { USER_NOT_FOUND, INVALID_PASSWORD } = require('../../../../errors/index');
const { createResponse } = require('../../../../utils/response');
const { Op } = require('sequelize');
const {SALT_ROUNDS, YOUR_SECRET_KEY, COOKIE_KEY} = require('../../../../env');

const Login = async(req, res, next)=>{
  const {userId,userPassword} = req.body;
  try {
    const user = await User.findOne({where:{userId}});
    if(!user) return next(USER_NOT_FOUND);
    const match = bcrypt.compare(userPassword,user.userPassword);
    if(!match) return next(INVALID_PASSWORD); 
    const token = jwt.sign({userId: userId}, YOUR_SECRET_KEY, {expiresIn:'7d'});
    res.cookie(COOKIE_KEY, token);
    res.json(createResponse(res,token));
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
      return res.status(400).json({
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

const searchUserId = async function(req,res,next) {
  const {params:{userId}, query:{value}} = req;
  try {
    const users = await User.findAll(
      {where: {userId: {[Op.like]: "%"+value+"%", [Op.not]: userId}},
      attributes: ['userId', 'name', 'studentId']
    });
    res.json(createResponse(res, users));
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const searchUserName = async function(req,res,next) {
  const {params:{userId}, query:{value}} = req;
  try {
    let decodedValue = decodeURIComponent(value);
    const users = await User.findAll(
      {where: {name: {[Op.like]: "%"+decodedValue+"%"}, userId: {[Op.not]: userId}},
      attributes: ['userId', 'name', 'studentId']
    });
    res.json(createResponse(res, users));
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getUsers = async function(req,res,next) {
  try {
    const users = await User.findAll(
      {attributes: ['userId', 'name', 'studentId']}
    );
    res.json(createResponse(res, users));
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getSomeUsers = async function(req, res, next) {
  const {params: {userId}} = req;
  try {
    const users = await User.findAll({where: {userId: {
      [Op.not]: userId
    }},
      attributes: ['userId', 'name', 'studentId']});
      res.json(createResponse(res, users));
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const putValidNum = async (req, res, next) => {
  const {params:{userId}, body} = req;
  try {
    const user = await User.findByPk(userId);
    await user.update(body);
    res.json(createResponse(res));
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {createUser, createToken, searchUserId, searchUserName, getUsers, getSomeUsers, putValidNum};
