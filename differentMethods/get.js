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

// GET request: Fetch all users
app.get('/api/users', (req, res) => {
  // Respond with all users
  res.status(200).json(users);
});

// GET request: Fetch a single user by ID
app.get('/api/users/:id', (req, res) => {
  // Extract 'id' parameter from request URL and convert it to integer
  const userId = parseInt(req.params.id, 10);

  // Find user by ID
  const user = users.find(u => u.id === userId);

  // If user is not found, send 404 error
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // If user is found, send the user object
  res.status(200).json(user);
});

// DELETE endpoint to remove a user by their ID
app.delete('/api/users/:id', (req, res) => {
  // Extract 'id' parameter from request URL and convert it to integer
  const userId = parseInt(req.params.id, 10);

  // Find the index of the user with the specified ID in the 'users' array
  const userIndex = users.findIndex(u => u.id === userId);

  // If no user is found with the provided ID, send a 404 (Not Found) response
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Remove the user from the 'users' array
  users.splice(userIndex, 1);

  // Send a 200 (OK) response with a success message
  res.status(200).json({ message: 'User deleted successfully' });
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

// 2. Testing in Postman:

//    Fetch all users:
//    - Create a new request.
//    - Set method to GET.
//    - Enter URL: http://localhost:3000/api/users
//    - Click "Send" and check response for all users.

//    Fetch a single user by ID:
//    - Create a new request.
//    - Set method to GET.
//    - Enter URL: http://localhost:3000/api/users/1 (replace "1" with desired user ID).
//    - Click "Send" and verify the response.

//    Delete a user by ID:
//    - Create a new request.
//    - Set method to DELETE.
//    - Enter URL: http://localhost:3000/api/users/1 (replace "1" with desired user ID).
//    - Click "Send" and check response for deletion confirmation.

// Expected Responses:
// - GET all users: status 200 with array of users.
// - GET single user: status 200 with user object, or 404 if user not found.
// - DELETE user: status 200 with success message, or 404 if user not found.
