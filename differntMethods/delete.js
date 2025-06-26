// Import the Express.js framework
const express = require('express');

// Create an instance of the express application
const app = express();

// Define the port number where the server will listen for requests
const port = 3000;

// Middleware to parse incoming JSON data from requests
app.use(express.json());

// In-memory data storage: a simple array of user objects for demonstration purposes
let users = [
    { id: 1, name: 'Arghya', email: 'arghya@example.com' },
    { id: 2, name: 'Polley', email: 'polley@example.com' }
];

// DELETE endpoint to remove a user by their ID
app.delete('/api/users/:id', (req, res) => {
    // Extract the 'id' parameter from the request URL and convert it to an integer
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

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

// To Test this in Postman:
// 1. Start your server:
//    - Open your terminal.
//    - Navigate to your project directory.
//    - Run the command: node yourfilename.js (replace "yourfilename.js" with the actual file name).

// 2. Open Postman:
//    - Create a new request.
//    - Set the method to DELETE.
//    - Enter the URL: http://localhost:3000/api/users/1 (replace "1" with the user ID you want to delete).

// 3. Send the request:
//    - Click the "Send" button.
//    - Check the response body and status code to verify the result.

// Expected Response:
//    - If successful, you will get a status 200 and message "User deleted successfully".
//    - If user ID doesn't exist, you'll receive status 404 and message "User not found".