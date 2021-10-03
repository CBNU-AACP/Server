const {User, Member} = require('../../../models');
const exceptionHandling = require('./checkAttendance');

const updateValidNum = async(userId, validNum)=>{        //이전의 putValidNum 함수
    return new Promise(async(resolve,reject)=>{
        try {
            setTimeout(async()=>{await User.update({validNum:null},{where:{userId}})}, 15000);
            const result = await User.update({validNum},{where:{userId}})
            resolve(result);
        } catch(error){
            console.error(error);
            reject(error);
        }   
    })
  };
  
const updateAttendance = async(userId, validNum, courseDateId)=>{
    return new Promise(async(resolve,reject) =>{
        try {
            const result = await exceptionHandling(userId, validNum, courseDateId);
            if(result){
                await Member.update({isChecked:true},{where:{userId, courseDateId}});
                resolve(result);
            }
            else reject(result);
        }
        catch (error) {
            console.error(error);
            reject(error);
        }
    })
}
  
module.exports = {updateAttendance, updateValidNum};