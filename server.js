const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' folder

// MySQL Database Connection
const db = mysql.createConnection({
    host: "myappdb-for-signup.mysql.database.azure.com",
    user: "rajeshbt",
    password: "Admin@123",
    database: "myapp",
    ssl: { rejectUnauthorized: true }
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to Azure MySQL database");
});

// POST route for signup
app.post("/signup", (req, res) => {
    const { name, email, password } = req.body;

    // Ensure valid data is received
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Insert new user into the database
    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(query, [name, email, password], (err, result) => {
        if (err) {
            console.error("Error registering user: " + err.message);
            return res.status(500).json({ message: "Error registering user" });
        }
        res.status(200).json({ message: "User registered successfully" });
    });
});

// Start the server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
