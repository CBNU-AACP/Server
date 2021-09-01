const makeSignature = require('./signature');
const {SMS_ACCESS_KEY, SMS_SERVICE_ID, MY_PHONE} = require('../../env');

const publishMessage = (phone) =>{
    const signature = makeSignature();
	const date = Date.now().toString();
	const number = 0990;
	const doc = {
		url : `https://sens.apigw.ntruss.com/sms/v2/services/${SMS_SERVICE_ID}/messages`,
		headers : {
			'Content-Type': 'application/json; charset=utf-8',
			'x-ncp-iam-access-key': `${SMS_ACCESS_KEY}`,
			'x-ncp-apigw-timestamp': date,
			'x-ncp-apigw-signature-v2': signature
		},
		data : {
			'type' : 'SMS',
			'countryCode' : '82',
			'from' : `${MY_PHONE.toString()}`,
			'content' : `[체크메이트] 인증번호 ${number} 입니다.`,
			'messages' : [
				{
					'to' : `${phone}`
				}
			]
		}
	}
	return doc;
}

module.exports = {publishMessage}