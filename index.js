const express = require('express');
const socket = require('socket.io');
const port = process.env.PORT || 3000;
// App setup
const app = express();
const server = app.listen(port, () => {
    console.log('listening for requests on port ' + port);
});

// Static files
app.use(express.static('public'));

// Socket setup & pass server
const io = socket(server);
io.on('connection', (socket) => {

    console.log('Made socket connection on id:', socket.id);

    // Handle chat event
    socket.on('chat', (data) => {
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });

});