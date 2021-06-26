const Sequelize = require('sequelize');

//한 교과에 속한 멤버 모델입니다
//처음 구조는 name (멤버 이름), mid (멤버 아이디)로 이루어져있습니다
module.exports = class Member extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            name : {
                type: Sequelize.STRING(20),
                allowNull : false,
            },
            mid : {
                type: Sequelize.INTEGER,
                allowNull : true,
            },
        },{
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : 'Member',
            tableName : 'models',
            paranoid : false,
            charset : 'utf8',
            collate : 'utf8_general_ci',
            });
    }
};