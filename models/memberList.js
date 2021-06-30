const Sequelize = require('sequelize');

module.exports = class MemberList extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            memberListId : {
                type: Sequelize.INTEGER,
                allowNull : true,
                primaryKey : true,
            }
        },{
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : 'MemberList',
            tableName : 'memberlists',
            paranoid : false,
            charset : 'utf8',
            collate : 'utf8_general_ci',
            });
    }
    static associate(db){
        db.MemberList.hasOne(db.AttendenceList, {foreignKey : "memberListId", sourceKey : "memberListId"});
        db.MemberList.hasMany(db.Member, {foreignKey : "memberListId", sourceKey : "memberListId"});
    }
};