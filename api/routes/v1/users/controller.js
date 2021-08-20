const {User} = require('../../../../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { USER_NOT_FOUND, INVALID_PASSWORD, USER_DUPLICATED, EMAIL_DUPLICATED } = require('../../../../errors/index');
const { createResponse } = require('../../../../utils/response');
const { Op } = require('sequelize');
const {SALT_ROUNDS, YOUR_SECRET_KEY, COOKIE_KEY} = require('../../../../env');

const login = async(req, res, next)=>{
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

const isDuplicated = async(req,res,next)=>{
  const {value} = req.params;
  try {
    if(value.indexOf('@') != -1){   //email일 경우
      const email = await User.findOne({where:{userEmail:value}});
      if(email) return next(EMAIL_DUPLICATED);
    }
    else{   //아이디일 경우
      const id = await User.findByPk(value);
      if(id) return next(USER_DUPLICATED); 
    }
    return res.json(createResponse(res));
  } catch (error) {
    console.error(error);
    next(error);
  }
}

const register = async(req,res,next)=>{
  try {
    req.body.userPassword = bcrypt.hashSync(req.body.userPassword, parseInt(SALT_ROUNDS));
    const user = await User.create(req.body);
    return res.json(createResponse(res));
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

module.exports = {login, isDuplicated, register, searchUserId, searchUserName, getUsers, getSomeUsers, putValidNum};
