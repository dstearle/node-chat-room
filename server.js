// Imports
const path = require('path');
const http = require('http');
const express = require('express');

// Initiates express
const app = express();

// Creates http server
const server = http.createServer(app);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// The port for the server
const PORT = 3000 || process.env.PORT;

// Runs the server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));