const { join } = require('path');
require('dotenv').config();
//환경 변수를 편하게 사용하기 위해 작성
module.exports = {
  ...process.env,
  IS_DEV: process.env.NODE_ENV === 'development'
};