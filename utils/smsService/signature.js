const crypto = require('crypto');
const {SMS_SERVICE_ID, SMS_ACCESS_KEY, SMS_SECRET_KEY} = require('../../env');

const makeSignature = ()=>{
    const date = Date.now().toString();
    const url = `/sms/v2/services/${SMS_SERVICE_ID}/messages`;
    const  hmac = crypto.createHmac('sha256', SMS_SECRET_KEY);
    let data = new Array;
    data.push("POST");
    data.push(" ");
    data.push(url);
    data.push("\n");
    data.push(date);
    data.push("\n");
    data.push(SMS_ACCESS_KEY);
    const signature = hmac.update(data.join('')).digest('base64');
    return signature;
}

module.exports = makeSignature;