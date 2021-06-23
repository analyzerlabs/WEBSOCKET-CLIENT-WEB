const express   = require('express');
const path  = require('path');
const app = express();

// settings de express
app.set('port',process.env.PORT || 3000);

// static files
app.use(express.static(path.join(__dirname,'public')));

// init Server
const server = app.listen(app.get('port'),()=> {
    console.log('server on port '+ app.get('port'))
});

const SocketIO = require('socket.io');
const io = SocketIO(server);

// websockets

io.on('connection',(socket)=>{
    console.log('new connection',socket.id);
    
    socket.on('chat:message',(data)=>{
        io.sockets.emit('chat:message',data);
    });
});