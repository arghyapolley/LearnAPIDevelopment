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

// PATCH request: Update a user partially by ID
app.patch('/api/users/:id', (req, res) => {
    // Extract 'id' parameter from request URL and convert it to integer
    const userId = parseInt(req.params.id, 10);
    // Extract 'name' and 'email' from request body
    const { name, email } = req.body;

    // Find user by ID
    const user = users.find(u => u.id === userId);

    // If user is not found, send 404 error
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Update user's name if provided
    if (name) {
        user.name = name;
    }

    // Update user's email if provided
    if (email) {
        user.email = email;
    }

    // Respond with updated user data
    res.status(200).json(user);
});

// Start the server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

// To Test this in Postman:
// 1. Start your server:
//    - Open your terminal.
//    - Navigate to your project directory.
//    - Run the command: node yourfilename.js (replace "yourfilename.js" with the actual file name).

// 2. Testing PATCH request in Postman:
//    - Create a new request.
//    - Set method to PATCH.
//    - Enter URL: http://localhost:3000/api/users/1 (replace "1" with desired user ID).
//    - Go to the "Body" tab, select "raw", and choose "JSON" from the dropdown.
//    - Enter the JSON data you want to update, e.g.:
//      {
//        "name": "Arghya SF",
//        "email": "asf@example.com"
//      }
//    - Click "Send" and check the response for updated user details.

// Expected Responses:
// - Successful update: status 200 with updated user object.
// - User not found: status 404 with message "User not found".