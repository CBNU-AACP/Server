const jwt = require('jsonwebtoken');
const YOUR_SECRET_KEY = process.env.SECRET_KEY;
require('dotenv').config();

const verifyToken = (req, res, next) => { //client 측에서 유효한 token을 가지고 있는지 확인합니다.
  try {
    const clientToken = req.cookies.user;
    const decoded = jwt.verify(clientToken, YOUR_SECRET_KEY);

    if(decoded) {
      res.locals.userId = decoded.userId;
      next();
    } else {
      res.status(401).json({
        message: 'unauthorized'
      });
    }
  } catch (error) {
    res.status(401).json({
      message: 'token expired'
    });
  }
}

module.exports = { verifyToken };