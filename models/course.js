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
        db.Course.hasMany(db.CourseDate, {foreignKey : "courseId", sourceKey : "courseId"});        //courseDate와 1대 다 관계
        db.Course.hasOne(db.MemberList, {foreignKey : "courseId", soruceKey : "courseId"});         //memberList와 1대 1 관계
        db.Course.belongsTo(db.User, {foreignKey:"userId", sourceKey:"userId"});    }

    static changeCount(db){
        db.Course.addHook('afterCreate',async(course,options)=>{
            const user = await db.User.findByPk(course.userId);
            let count = user.count+1;
            await user.update({count});
        })
        db.Course.addHook('beforeDestroy',async(course,options)=>{
            const user = await db.User.findByPk(course.userId);
            let count = user.count-1;
            await user.update({count});
        })
    }

};