const Sequelize = require('sequelize');

module.exports = class Certification extends Sequelize.Model{ 
    static init(sequelize){
        return super.init({
            userId : {
                type: Sequelize.STRING(20),
                allowNull : false,
            },
            smsAttempts : {
                type: Sequelize.INTEGER(2).UNSIGNED,
                allowNull : false,
                defaultValue : 1,
            },
            keyAttempts : {
                type: Sequelize.INTEGER(2).UNSIGNED,
                allowNull : false,
                defaultValue : 0,
            },
            value : {
                type : Sequelize.INTEGER(4).UNSIGNED,
                allowNull : false
            },
            lastRecord : {
                type : Sequelize.STRING(20),
                allowNull : true,
            }
        },{
            sequelize,
            timestamps : false,
            underscored : false,
            modelName : 'Certification',
            tableName : 'certifications',
            paranoid : false,
            charset : 'utf8',
            collate : 'utf8_general_ci',
            });
    }
    static associate(db){
    }
};