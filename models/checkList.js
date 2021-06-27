const Sequelize = require('sequelize');

//날짜별 실제 강의 모델입니다
//처음 구조는 cid (checklist id)로 이루어져있습니다
//cid는 자동으로 생성되는 Object id가 아닌 년도+월+일 형태의 아이디를 만드는 건 어떨까라는 생각을 합니다
module.exports = class CheckList extends Sequelize.Model{ 
    static init(sequelize){
        return super.init({
             cid : {
                type: Sequelize.INTEGER,
                allowNull : true,
            }
        },{
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : 'CheckList',
            tableName : 'checklists',
            paranoid : false,
            charset : 'utf8',
            collate : 'utf8_general_ci',
            });
    }
};