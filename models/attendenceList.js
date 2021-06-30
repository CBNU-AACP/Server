const Sequelize = require('sequelize');

module.exports = class AttendenceList extends Sequelize.Model{ 
    static init(sequelize){
        return super.init({
            attendenceListId : {
                type: Sequelize.INTEGER,
                allowNull : true,
            },
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
        db.AttendenceList.belongsTo(db.CourseData, {foreignKey : "courseDataId", targetKey : "courseDataId"});
        db.AttendenceList.belongsTo(db.MemberList, {foreignKey : "memberId", targetKey : "memberListId"})
    }
};