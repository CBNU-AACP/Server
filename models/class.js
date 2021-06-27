const Sequelize = require('sequelize');

//클래스(교과) 모델입니다
//처음 구조는 name (클래스 이름), cid (클래스 아이디)로 이루어져있습니다
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