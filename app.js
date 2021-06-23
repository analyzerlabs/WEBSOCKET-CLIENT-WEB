const { Socket } = require('dgram');
const express   = require('express');
const path  = require('path');
const app = express();


const SocketIO = require('socket.io');




// settings de express
app.set('port',process.env.PORT || 3000);



// middlewares


// static files
app.use(express.static(path.join(__dirname,'public')));


// errors


// init Server
const server = app.listen(app.get('port'),()=> {
    console.log('server on port '+ app.get('port'))
});

// websockets
const io = SocketIO(server);
io.on('connection',(socket)=>{
    console.log('new connection',socket.id);
    
    socket.on('chat:message',(data)=>{
        io.sockets.emit('chat:message',data);
    });
});