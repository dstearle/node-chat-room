// Imports
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');

// Initiates express
const app = express();

// Creates http server
const server = http.createServer(app);

// Initiates socket.io
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'ChatCord Bot';

// Run when client connects
io.on('connection', socket => {

    // Informs the terminal of successful connection
    console.log('New WS connection...');

    // Response once a user joins a chat room
    socket.on('joinRoom', ({ username, room }) => {

        // The user joining the room
        const user = userJoin(socket.id, username, room);

        // Adds the user to the selected room
        socket.join(user.room);

        // Emits a welcome message to the chat room after successful connection
        socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));

        // Informs everyone (except the person connecting) of new user joining the chat room
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${ user.username } has joined the chat!`));

        // Send users and chat info
        io.to(user.room).emit('roomUsers', {

            room: user.room,
            users: getRoomUsers(user.room)

        });

    });

    // Listen for chat message
    socket.on('chatMessage', (msg) => {

        io.emit('message', formatMessage('User', msg));

    });

    // Runs when client disconnects
    socket.on('disconnect', () => {

        // The current user leaving
        const user = userLeave(socket.id);

        // Informs other users in the chat that current user has left the chat room
        if(user) {

            io.to(user.room).emit('message', formatMessage(botName, `${ user.username } has left the chat`));

        }

        // Send users and chat info
        io.to(user.room).emit('roomUsers', {

            room: user.room,
            users: getRoomUsers(user.room)
            
        });

    });

});

// The port for the server
const PORT = 3000 || process.env.PORT;

// Runs the server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));