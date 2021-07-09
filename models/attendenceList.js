const Sequelize = require('sequelize');

module.exports = class AttendenceList extends Sequelize.Model{ 
    static init(sequelize){
        return super.init({
            isChecked : {
                type : Sequelize.BOOLEAN,
                allowNull : false,
                default : false
            },
        },{
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : 'AttendenceList',
            tableName : 'attendencelists',
            paranoid : false,
            charset : 'utf8',
            collate : 'utf8_general_ci',
            });
    }

    static associate(db){
        db.AttendenceList.belongsTo(db.CourseDate, {foreignKey : "courseDateId", targetKey : "courseDateId"});
        db.AttendenceList.belongsTo(db.MemberList, {foreignKey : "memberListId", targetKey : "id"})
    }
};