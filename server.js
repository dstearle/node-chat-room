// Imports
const express = require('express');

// Initiates express
const app = express();

// The port for the server
const PORT = 3000 || process.env.PORT;

// Runs the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));