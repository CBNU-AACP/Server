const Sequelize = require('sequelize');

module.exports = class Course extends Sequelize.Model{ 
    static init(sequelize){
        return super.init({
            name : {
                type: Sequelize.STRING(20),
                allowNull : false,
            },
            courseId : {
                type: Sequelize.INTEGER,
                allowNull : true,
            },
        },{
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : 'Course',
            tableName : 'courses',
            paranoid : false,
            charset : 'utf8',
            collate : 'utf8_general_ci',
            });
    }
};