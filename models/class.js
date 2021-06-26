const Sequelize = require('sequelize');

module.exports = class CLass extends Sequelize.Model{ 
    static init(sequelize){
        return super.init({
            name : {
                type: Sequelize.STRING(20),
                allowNull : false,
            },
            cid : {
                type: Sequelize.INTEGER,
                allowNull : true,
            },
        },{
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : 'Class',
            tableName : 'classes',
            paranoid : false,
            charset : 'utf8',
            collate : 'utf8_general_ci',
            });
    }
};