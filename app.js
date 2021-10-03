const express = require('express');
const morgan = require('morgan');
const router = require('./api/routes')
const { sequelize } = require('./models');
const cors = require('cors');
const { stream } = require('./errors/winston');
const { IS_DEV, PORT, NODE_ENV } = require('./env');
const { notFound, errorHandler } = require('./errors/handler');
const Socket = require('./api/socket/');

const app = express();

app.set('port', PORT || 3001);

//db connect
sequelize.sync({ force: false })    //force가 true이면 db에 있는 정보들을 모두 지우고 다시 만듭니다(db 컬럼값에 변동이 생기면 바꿉시다)
  .then(() => {
    console.log('DB connected!');
  })
  .catch((err) => {
    console.error(err);
  })

app.use(cors({
  withCredentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(morgan(IS_DEV ? 'dev' : 'combined', {stream})); //개발 상태일땐 'dev'옵션, 배포 상태일땐 'combined'옵션 사용.
app.use('/', router);
app.use(notFound);
app.use(errorHandler);

//Start server
const server = app.listen(app.get('port'), () => {
    console.log(
        `Listening http://localhost:${app.get('port')} in ${app.get('env')} mode!!!`);
});

//Start socket
Socket(server);