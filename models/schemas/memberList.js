const Sequelize = require('sequelize');

module.exports = class MemberList extends Sequelize.Model{
    static init(sequelize){
        return super.init({
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
      db.MemberList.belongsToMany(db.User, { through: 'UserMemberList', foreignKey: 'memberListId'});
      db.MemberList.belongsTo(db.Course, {foreignKey : "courseId", targetKey : "courseId"});
      db.MemberList.hasMany(db.Member, {foreignKey : "memberListId", sourceKey : "id"});
    }
};