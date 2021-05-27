const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const router = require('./routes')
const { sequelize } = require('./models');

dotenv.config();

const app = express();

app.set('port', process.env.PORT || 3000);

//db connect
sequelize.sync({ force: false })
  .then(() => {
    console.log('DB connected!');
  })
  .catch((err) => {
    console.error(err);
  })

app.use(morgan('dev'));
app.use('/', router);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} router not existed`);
    error.status = 404;
    next(error);
  });
  
//error handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

//Start server
app.listen(app.get('port'), () => {
    console.log(
        `Listening http://localhost:${app.get('port')} in ${app.get('env')} mode!!!`);
});