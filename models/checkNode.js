const Sequelize = require('sequelize');

//출석부에 나오는 학생 한명 한명의 출석정보입니다
//처음 구조는 cid(checknode id), mid(member id), attendenceCheck(출석 여부) 로 이루어집니다
//현재 프로토타입 구성에서는 의존관계는 고려하지않지만 나중에는 Member 클래스와 연결관계를 만들 생각입니다
module.exports = class CheckNode extends Sequelize.Model{ 
    static init(sequelize){
        return super.init({
            cid : {
                type: Sequelize.INTEGER,
                allowNull : true,
            }, 
            mid : {
                type: Sequelize.INTEGER,
                allowNull : true,
            },
            isChecked : {
                type : Sequelize.BOOLEAN,
                allowNull : false,
                default : false
            },
        },{
            sequelize,
            timestamps : true,
            underscored : false,
            modelName : 'CheckNode',
            tableName : 'checknodes',
            paranoid : false,
            charset : 'utf8',
            collate : 'utf8_general_ci',
            });
    }

};