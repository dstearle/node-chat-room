// Imports
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

// Initiates express
const app = express();

// Creates http server
const server = http.createServer(app);

// Initiates socket.io
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Run when client connects
io.on('connection', socket => {

    // Informs the terminal of successful connection
    console.log('New WS connection...');

    // Emits a welcome message to the chat room after successful connection
    socket.emit('message', 'Welcome to ChatCord!');

});

// The port for the server
const PORT = 3000 || process.env.PORT;

// Runs the server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));