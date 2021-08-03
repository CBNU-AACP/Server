const Sequelize = require('sequelize');

module.exports = class CourseDate extends Sequelize.Model{ 
    static init(sequelize){
        return super.init({
             courseDateId : {
                type: Sequelize.STRING(30),
                allowNull : true,
                primaryKey : true,
            }
        },{
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : 'CourseDate',
            tableName : 'coursedates',
            paranoid : false,
            charset : 'utf8',
            collate : 'utf8_general_ci',
            });
    }

    static associate(db){
        db.CourseDate.hasMany(db.Member, {foreignKey : "courseDateId", sourceKey : "courseDateId"});
    }
};