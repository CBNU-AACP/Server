const Sequelize = require('sequelize');

module.exports = class CourseData extends Sequelize.Model{ 
    static init(sequelize){
        return super.init({
             courseDataId : {
                type: Sequelize.INTEGER,
                allowNull : true,
            }
        },{
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : 'CourseData',
            tableName : 'coursedatas',
            paranoid : false,
            charset : 'utf8',
            collate : 'utf8_general_ci',
            });
    }

    static associate(db){
        db.CourseData.belongsTo(db.Course, {foreignKey : "courseId", targetKey : "courseId"});
        db.CourseData.hasMany(db.AttendenceList, {foreignKey : "courseDataId", sourceKey : "courseDataId"});
    }
};