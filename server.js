// Imports
const express = require('express');

// Initiates express
const app = express();

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// The port for the server
const PORT = 3000 || process.env.PORT;

// Runs the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));