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