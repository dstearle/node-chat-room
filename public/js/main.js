// The form used by chat.html
const chatForm = document.getElementById('chat-form');

// Initiates a socket
const socket = io();

// Fires off a message in the socket
socket.on('message', message => {

    console.log(message);

});

// Message submit
chatForm.addEventListener('submit', (e) => {

    e.preventDefault();
    
    // The message from the text input
    const msg = e.target.elements.msg.value;

    console.log(msg);

});