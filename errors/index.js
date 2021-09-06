const httpErrors = require('http-errors');

const createError = err => {
  const e = httpErrors(err[0], err[1]);
  e.code = err[2];
  return e;
};

const errors = {
  // 400 Errors
  INVALID_QR_CODE: [400, '유효하지 않은 QR Code입니다.'],
  INVALID_COURSE_DATE_ID: [400, '유효하지 않은 courseDateId입니다.'],
  INVALID_PASSWORD: [400, '유효하지 않은 비밀번호입니다.'],
  EXPIRED_TOKEN : [400, '만료된 Token입니다.'],

  // 401 Errors
  LOGIN_REQUIRED: [401, '로그인이 필요합니다.'],

  // 403 Errors
  FORBIDDEN: [403, '권한이 없는 요청입니다.'],

  // 404 Errors
  USER_NOT_FOUND: [404, '찾을 수 없는 유저입니다.'],
  COURSE_NOT_FOUND: [404, '찾을 수 없는 코스입니다.'],
  USER_DUPLICATED: [404, '중복된 아이디입니다'],
  EMAIL_DUPLICATED: [404, '중복된 이메일입니다'],
  MEMBERLIST_NOT_FOUND: [404, '찾을 수 없는 memberList입니다.'],
  MEMBER_NOT_FOUND: [404, '찾을 수 없는 member입니다.'],
  COURSEDATE_NOT_FOUND: [404, 'COURSEDATE가 존재하지 않습니다.'],
  NOT_FOUND: [404, '찾을 수 없는 요청입니다.'],
  EXCEEDED_SMS_COUNT : [404, '하루 전송 건 수를 초과했습니다'],
  EXCEEDED_KEY_COUNT : [404, '하루 인증키 시도 횟수를 초과했습니다'],
  INVALID_CERTIFICATION_KEY : [404, '유효하지 않은 인증키입니다'],
  CERTIFICATION_KEY_EXPIRED : [404, '유효 시간이 지났습니다'],
  CERTIFICATION_INFO_NOT_EXISTED : [404, '해당 정보가 존재하지 않습니다'],
  
  // 500 Errors
  SERVER_ERROR: [500, '서버 에러.'],
};

Object.keys(errors).forEach(key => {
  errors[key] = createError([...errors[key], key]);
});

module.exports = errors;