const SocketIO = require('socket.io');
const {readdirSync, statSync} = require('fs');
const {join} = require('path');

// 하위 폴더명에 따라서 '네임 스페이스'를 자동으로 만들어주는 코드
// 네임스페이스 -> http 상에서의 라우터 개념
// socket.io의 계층 구조 : socket.io -> 네임 스페이스 -> 방 

module.exports = (server) =>{       
    const io = SocketIO(server, {path: '/socket.io'});       //해당 path에 따라서 클라와의 소켓 통로를 만든다
    readdirSync(join(__dirname))
        .filter(dir=> statSync(join(__dirname, dir)).isDirectory())     //하위 디렉토리들만을 filtering
        .forEach(dir=> require(join(__dirname, dir))(io))               //네임 스페이스로된 폴더 아래 index.js를 실행
}