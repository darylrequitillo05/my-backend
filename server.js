const mysql = require('mysql2');

// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root1234', // replace with your MySQL password
    database: 'my_database'
});
// Connect to database
db.connect((err) => {
    if(err) throw err;
    console.log("Connected to MySQL Database!");
});


const express = require('express'); // Import Express
const app = express(); // Create an Express app
const PORT = 3000; // Set the server port

// Middleware to parse JSON request bodies
app.use(express.json());

// Route: Home
app.get('/', (req, res) => {
  res.send('Welcome to My Backend Server!');
});

// Route: API Example
app.get('/api/user', (req, res) => {
  res.json({
    name: "John Doe",
    email: "john@example.com"
  });
});

// Route: Contact
app.post('/api/contact', (req, res) => {
 const { name, email, message } = req.body;
 if(!email.includes('@')) {
 return res.status(400).json({ error: "Invalid email address" });
 }
 const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
 db.query(sql, [name, email, message], (err, result) => {
 if(err) throw err;
 res.json({
 message: `Thank you ${name}, your message has been saved!`,
 data: { id: result.insertId, name, email, message }
 });
 });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});