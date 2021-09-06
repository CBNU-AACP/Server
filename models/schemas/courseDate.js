const Sequelize = require('sequelize');

module.exports = class CourseDate extends Sequelize.Model{ 
    static init(sequelize){
        return super.init({
             courseDatePK : {
               type: Sequelize.INTEGER,
               autoIncrement: true,
               primaryKey : true
             },
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
        db.CourseDate.hasMany(db.Member, {foreignKey : "courseDatePK", sourceKey : "courseDatePK"});
    }
};