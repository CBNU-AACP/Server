const Sequelize = require('sequelize');

module.exports = class Member extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            name : {
                type: Sequelize.STRING(20),
                allowNull : false,
            },
            memeberId : {
                type: Sequelize.INTEGER,
                allowNull : true,
            },
        },{
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : 'Member',
            tableName : 'members',
            paranoid : false,
            charset : 'utf8',
            collate : 'utf8_general_ci',
            });
    }
};