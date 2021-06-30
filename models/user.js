const Sequelize = require('sequelize');

//기저가되는 회원 정보를 담는 user 모델입니다.
//userId (유저 아이디)와 userPassword (유저 비밀번호)로 이루어져있습니다.
//member 모델과 1:1관계를 맺습니다. 

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      userId: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      userPassword: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
};