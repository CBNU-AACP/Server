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
};