// backend/app.js
const express = require("express");
const app = express();
const path = require("path");

// Define the path to your frontend folder
const frontendPath = path.join(__dirname, "..", "frontend");

// Serve static files from the "frontend" folder
app.use(express.static(frontendPath));

// Define your API routes and other backend logic here

// Start the Express.js server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
