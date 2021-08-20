const Sequelize = require('sequelize');

module.exports = class Course extends Sequelize.Model{ 
    static init(sequelize){
        return super.init({
            name : {
                type: Sequelize.STRING(20),
                allowNull : false,
            },
            courseId : {
                type: Sequelize.STRING(20),
                allowNull : true,
                primaryKey : true,
            },
            description : {
                type : Sequelize.TEXT,
                allowNull : true
            }
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

    static associate(db){
        db.Course.belongsTo(db.User, {foreignKey:"userId", targetKey:"userId"});   
        db.Course.hasOne(db.MemberList, {foreignKey : "courseId", soruceKey : "courseId"});         //memberList와 1대 1 관계 
      }

    static changeCount(db){
        db.Course.addHook('afterCreate',async(course,options)=>{
            const user = await db.User.findByPk(course.userId);
            let courseCount = user.courseCount+1;
            await user.update({courseCount});
        })
        db.Course.addHook('beforeDestroy',async(course,options)=>{
            const user = await db.User.findByPk(course.userId);
            let courseCount = user.courseCount-1;
            await user.update({courseCount});
        })
    }

};