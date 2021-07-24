const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development'; 
const config = require('../config/index')[env];
const Member = require('./member');
const Course = require('./course');
const CourseDate = require('./courseDate');
const MemberList = require('./memberList');
const User = require('./user');
// sequelize 객체를 생성하는 코드입니다

// 먼저 sequelize 객체를 .env 정보에 기반하여 생성합니다
const sequelize = new Sequelize(
  config.database, 
  config.username, 
  config.password, 
  config
);

//db 객체에 각종 정보들을 넣어줍니다
const db = {};
db.sequelize = sequelize;
db.Member = Member;
db.Course = Course;
db.CourseDate = CourseDate;
db.MemberList = MemberList;
db.User = User;

Member.init(sequelize);
Course.init(sequelize);
CourseDate.init(sequelize);
MemberList.init(sequelize);
User.init(sequelize);

Member.associate(db);
Course.associate(db);
CourseDate.associate(db);
MemberList.associate(db);
User.associate(db);

Course.changeCount(db);

module.exports = db;