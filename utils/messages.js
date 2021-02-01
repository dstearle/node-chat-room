// Imports
const moment = require('moment');

// Formats the message
function formatMessage(userName, text) {

    return {

        userName,
        text,
        time: moment().format('h:mm a')

    }

};

module.exports = formatMessage;