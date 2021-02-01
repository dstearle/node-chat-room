// Imports
const moment = require('moment');

// Formats the message
function formatMessage(username, text) {

    return {

        username,
        text,
        time: moment().format('h:mm a')

    }

};

module.exports = formatMessage;