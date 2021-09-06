const { Certification } = require('../../../../models');
const { createResponse } = require('../../../../utils/response');
const { EXCEEDED_SMS_COUNT, INVALID_CERTIFICATION_KEY, EXCEEDED_KEY_COUNT, CERTIFICATION_KEY_EXPIRED } = require('../../../../errors/index'); 
const { makeKey } = require('../../../../utils/smsService/authorizeKey');
const {publishMessage} = require('../../../../utils/smsService');
const { default: axios } = require('axios');

const sendMessage = async(req,res,next)=>{
    const {params:{phone}} = req;
    try {
        const number = res.locals.key;
        const doc = publishMessage(phone, number);
        await axios({
            method: "POST",
            json: true,
            url: doc.url.toString(),
            headers: doc.headers,
            data: doc.data
        })
        res.json(createResponse(res));
    } catch (error) {
      next(error);
    }
  }

const verifyCertificationInfo = async(req,res,next)=>{      //기존 certification을 만들거나 수정한다
    const {userId} = req.params;
    try {
        const date = new Date().getTime();
        const value = makeKey();
        res.locals.key = value;
        const doc = await Certification.findOrCreate({
            where:{userId},
            defaults:{userId, value, lastRecord:date}
        })
        if(!doc[1]){                                               //기존에 존재했다면
            const calc = (parseInt(date)-parseInt(doc[0].lastRecord))/1000;
            if(calc < 86400 && doc[0].smsAttempts == 5) return next(EXCEEDED_SMS_COUNT);
            const updated = await doc[0].update({value, lastRecord:date});
            if(calc >= 86400){
                updated.smsAttempts = 1;
                updated.keyAttempts = 0;
                await updated.save({fields:['smsAttempts', 'keyAttempts']});
            }
            else {                                                  //하루가 지나지않았다면
                await updated.increment('smsAttempts', {by:1});
            }
        }
        next();
    } catch (error) {
        console.error(error);
        next(error)
    }
}

const compareCertificationKey = async(req,res,next)=>{
    const {params:{userId},query:{key}} = req;
    try {
        const date = new Date().getTime();
        const doc = await Certification.findOne({where:{userId}});
        if(!doc) return next(CERTIFICATION_INFO_NOT_EXISTED);
        if((parseInt(date)-parseInt(doc.lastRecord))/1000 > 60) return next(CERTIFICATION_KEY_EXPIRED);   //15초가 지난 경우
        if(doc.keyAttempts > 5) return next(EXCEEDED_KEY_COUNT);                                //key 시도가 5회 초과할 경우
        if(doc.value == key){                                                                   //key값이 맞는 경우
            await Certification.destroy({where:{userId}});
            return res.json(createResponse(res));
        }         
        else{                                                                                   //key값이 맞지않는 경우
            await doc.increment('keyAttempts', {by:1});
            return next(INVALID_CERTIFICATION_KEY);
        }                    
    } catch (error) {
        console.error(error);
        next(error);
    }
}

module.exports = { verifyCertificationInfo, compareCertificationKey, sendMessage };