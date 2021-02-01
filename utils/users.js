// An empty array to store users
const users = [];

// Join user to chat
function userJoin(id, username, room) {

    // User data object for storing information passed in about the user
    const user = { id, username, room };

    // Pushes the new user to the 'users' array
    users.push(user);

    return user;

}

// Get Current User
function getCurrentUser(id) {

    return users.find(user => user.id === id);

}

// When user leaves the chat
function userLeave(id) {

    // The current index for the user
    const index = users.findIndex(user => user.id === id);

    // If user exists remove them from the chat
    if(index !== -1) {

        return users.splice(index, 1);

    }

}

// Get current room users
function getRoomUsers(room) {

    return users.filter(user => user.room === room);

}


module.exports = {

    userJoin,
    getCurrentUser,
    
};