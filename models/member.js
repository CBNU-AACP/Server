const Sequelize = require('sequelize');

module.exports = class Member extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            name : {
                type: Sequelize.STRING(20),
                allowNull : false,
            },
            memberId : {
                type: Sequelize.INTEGER,
                allowNull : true,
                primaryKey : true,
            }
        },{
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : 'Member',
            tableName : 'members',
            paranoid : false,
            charset : 'utf8',
            collate : 'utf8_general_ci',
            });
    }

    static associate(db) {  //User와 Meber 1:1 관계 설정
        db.Member.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'userId'});
        db.Member.belongsTo(db.MemberList,{foreignKey : "memberListId", targetKey : "memberListId"});
    }
};