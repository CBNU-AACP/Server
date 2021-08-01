const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development'; 
const config = require('../config/index')[env];
const {readdirSync} = require('fs');
const {join} = require('path');

const sequelize = new Sequelize(
  config.database, 
  config.username, 
  config.password, 
  config
);

const db = {};
db.sequelize = sequelize;

readdirSync(join(__dirname, 'schemas'))
  .filter(file=>/\.js/.test(file))    //js로 끝나는 것만 test에 넣어서 true를 리턴해 filter로 거른다
  .forEach(file=>{
    const fileName = file.replace(/\.js/, '').replace(/\b[a-z]/, letter => letter.toUpperCase())    //파일명에서 js를 뺴주고 첫글자를 대문자로 replace한다
    const schema = require(join(__dirname, 'schemas', file));   //해당 model에 해당하는 것을 require해준다
    db[fileName] = schema;   
    schema.init(sequelize);
    if(fileName == 'Course') schema.changeCount(db);    //Course에는 따로 changeCount라는 메소드가 있으므로 
  });

Object.keys(db).forEach((key)=>{ 
    if(key != 'sequelize') db[key].associate(db);   //associate도 위에서 처리하려고 했지만 이전에 부모 관계에 있는 DB가 init처리가 되지않아서 오류가 발생, 그래서 뒤로 따로 뺏음
});

module.exports = db;