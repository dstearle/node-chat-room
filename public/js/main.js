// Initiates a socket
const socket = io();

// Fires off a message in the socket
socket.on('message', message => {

    console.log(message);

});