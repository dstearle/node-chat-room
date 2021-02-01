// The form used by chat.html
const chatForm = document.getElementById('chat-form');
// The messages in the chat room
const chatMessages = document.querySelector('.chat-messages');
// The name of the current chat room
const roomName = document.getElementById('room-name');
// The current users in the chat room
const userList = document.getElementById('users');

// Get username and room from the URL
const { username, room } = Qs.parse(location.search, {

    ignoreQueryPrefix: true

});

// Initiates a socket
const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, room });

// Get current room and users
socket.on('roomUsers', ({ room, users }) => {

    outputRoomName(room);
    outputUsers(users);
    
});

// Fires off a message in the socket
socket.on('message', message => {

    console.log(message);

    // The message to be added to the chat
    outputMessage(message);

    // Scroll down to latest message
    chatMessages.scrollTop = chatMessages.scrollHeight;

});

// Message submit
chatForm.addEventListener('submit', (e) => {

    e.preventDefault();
    
    // The message from the text input
    const msg = e.target.elements.msg.value;

    // Emit message to the server
    socket.emit('chatMessage', msg);

    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();

});

// Output message to DOM
function outputMessage(message) {

    // Creates a div element in the DOM to hold the message
    const div = document.createElement('div');

    // Applies the css class 'message' to the new div
    div.classList.add('message');

    // The content to go inside of the new div
    div.innerHTML = `<p class='meta'>${ message.username } <span>${ message.time }</span></p>
    <p class='text'>${ message.text }</p>`;

    // Appends the new div into the chat
    document.querySelector('.chat-messages').appendChild(div);

}

// Add room name to DOM
function outputRoomName(room) {

    roomName.innerText = room;
    
};