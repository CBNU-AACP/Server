const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development'; 
const config = require('../config/index')[env];
const Member = require('./member');
const Class = require('./class');

const db = {};

const sequelize = new Sequelize(
  config.database, 
  config.username, 
  config.password, 
  config
);

db.sequelize = sequelize;

db.Member = Member;
db.Class = Class;

Member.init(sequelize);
Class.init(sequelize);

module.exports = db;