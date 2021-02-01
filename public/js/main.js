// The form used by chat.html
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

// Initiates a socket
const socket = io();

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
    div.innerHTML = `<p class='meta'>Dallas <span>2:00am</span></p>
    <p class='text'>${ message }</p>`;

    // Appends the new div into the chat
    document.querySelector('.chat-messages').appendChild(div);

}