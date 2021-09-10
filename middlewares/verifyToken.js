const jwt = require('jsonwebtoken');
const {JWT_AUTORIZATION_KEY, YOUR_SECRET_KEY} = require('../env');
const {JSON_WEB_TOKEN_ERROR, TOKEN_EXPIRED} = require('../errors');

const verifyToken = async (req, res, next) => {
  const token = req.headers[`${JWT_AUTORIZATION_KEY}`];
  try {
      await jwt.verify(token, YOUR_SECRET_KEY);
      next();
  } catch (error) {
    if(error.name == "TokenExpiredError") return next(TOKEN_EXPIRED);
    if(error.name == "JsonWebTokenError") return next(JSON_WEB_TOKEN_ERROR);
    next(error);
  }
}

module.exports = { verifyToken };