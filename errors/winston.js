const fs = require('fs');
const winston = require('winston');

const logDir = __dirname + '/../logs';

if(!fs.existsSync(logDir)) {  //logDir가 존재하지 않으면 생성
  fs.mkdirSync(logDir);
}

const infoTransport = new winston.transports.File({ //info Level 로그에대한 처리
  filename: 'info.log',
  dirname: logDir,
  level: 'info'
});

const errorTransport = new winston.transports.File({  //error Level 로그에대한 처리
  filename: 'error.log',
  dirname: logDir,
  level: 'error'
});

const logger = winston.createLogger({ //로그를 생성해줄 logger 인스턴스
  transports: [infoTransport, errorTransport]
});

const stream = {  
  write: message => {
    console.log(message); //위에서 커스터마이징한 transports에 맞게 log 파일 및 console log 출력
    logger.info(message);
  }
};

module.exports = { logger, stream };