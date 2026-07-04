const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Configure environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/ping", (req, res) => {
    res.status(200).send("pong");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});