// Import the Express.js framework
const express = require('express');

// Create an instance of the express application
const app = express();

// Define the port number where the server will listen for requests
const port = 3000;

// Middleware to parse incoming JSON data from requests
app.use(express.json());

// Sample data store (In-memory database)
let users = [
  { id: 1, name: 'Arghya', email: 'arghya@example.com' },
  { id: 2, name: 'Polley', email: 'polley@example.com' }
];

// POST request: Create a new user
app.post('/api/users', (req, res) => {
  // Extract 'name' and 'email' from the request body
  const { name, email } = req.body;

  // Log incoming request data
  console.log('Request Body:', req.body);

  // Check if both name and email are provided
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  // Create a new user object
  const newUser = {
    id: users.length + 1,  // Auto-increment ID based on current array length
    name,
    email
  };

  // Log the users array before adding the new user
  console.log('Users Array Before Adding New User:', users);

  // Add the new user to the in-memory users array
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

// To Test this in Postman:
// 1. Start your server:
//    - Open your terminal.
//    - Navigate to your project directory.
//    - Run the command: node yourfilename.js (replace "yourfilename.js" with the actual file name).

// 2. Testing POST request in Postman:
//    - Create a new request.
//    - Set method to POST.
//    - Enter URL: http://localhost:3000/api/users
//    - Go to the "Body" tab, select "raw", and choose "JSON" from the dropdown.
//    - Enter the JSON data for the new user, e.g.:
//      {
//        "name": "Arghya SF",
//        "email": "asf@example.com"
//      }
//    - Click "Send" and verify the response for the newly created user.

// Expected Responses:
// - Successful creation: status 201 with new user object.
// - Missing fields: status 400 with message "Name and email are required".