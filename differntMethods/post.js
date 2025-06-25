const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON data from requests
app.use(express.json());

// Sample data store (In-memory database)
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// POST request: Create a new user
app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
  
    // Log incoming request to verify that the client is sending the data
    console.log('Request Body:', req.body);
  
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }
  
    // Create a new user object
    const newUser = {
      id: users.length + 1,  // Auto-increment ID based on array length
      name,
      email
    };
  
    // Log the users array before adding the new user
    console.log('Users Array Before Adding New User:', users);
  
    // Add the new user to the in-memory store
    users.push(newUser);
  
    // Log the users array after adding the new user
    console.log('Users Array After Adding New User:', users);
  
    // Respond with the newly created user
    res.status(201).json(newUser);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
