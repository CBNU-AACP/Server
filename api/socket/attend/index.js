const {updateAttendance, updateValidNum} = require('./controller');

module.exports = async(io) => {
    const attend = io.of('/attend');        // socket.Io 객체를 가지고 네임 스페이스 생성
    attend.on('connection', (socket)=>{     // 소켓이 연결되었다면 실행
        console.log(`new client entered attend space ${socket.id}`);
        socket.on('check', (data)=>{        //ValidNum을 checking해주는 이벤트 처리
            updateAttendance(data.userId, data.validNum, data.courseDateId)
                .then((data)=> {
                    console.log(data);
                    socket.emit('message', {"code" : "success"})        //message 네임 스페이스에 해당 문구를 출력
                })
                .catch((err)=>{
                    console.log(err);
                    socket.emit('message', {"code" : err})
                });
        })
        socket.on('change', (data)=>{       //validNum을 갱신시켜주는 이벤트  처리
            updateValidNum(data.userId, data.validNum)
                .then((data)=>{
                    console.log(data);
                    socket.emit('message', {"code" : "success"})
                })
                .catch((err)=>{
                    console.log(err);
                    socket.emit('message', {"code" : err});
                })
        })
        socket.on('disconnect', ()=>{
            console.log(`client disconnected ${socket.id}`);
        })
        socket.on('error', (error)=>{
            console.error(error);
        })
    })
}
