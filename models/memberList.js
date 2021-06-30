const Sequelize = require('sequelize');

module.exports = class MemberList extends Sequelize.Model{
    static init(sequelize){
        return super.init({
        },{
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : 'MemberList',
            tableName : 'memberlists',
            paranoid : false,
            charset : 'utf8',
            collate : 'utf8_general_ci',
            });
    }
};