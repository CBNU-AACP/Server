const Sequelize = require('sequelize');

module.exports = class Member extends Sequelize.Model{
    static init(sequelize){
        return super.init({            
            isChecked : {
                type : Sequelize.BOOLEAN,
                default : false
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
        db.Member.belongsToMany(db.User, { through: 'UserMember'});
        db.Member.belongsTo(db.MemberList, {foreignKey : "memberListId", targetKey : "id"});
        db.Member.belongsTo(db.CourseDate, {foreignKey : "courseDateId", targetKey : "courseDateId"});
    }
};