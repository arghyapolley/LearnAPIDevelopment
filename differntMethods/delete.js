const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let users = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ];
    
app.delete('/api/users/:id', (req, res) => {
        const userId = parseInt(req.params.id, 10);
        const userIndex = users.findIndex(u => u.id === userId);
    
        if (userIndex === -1) {
            return res.status(404).json({ message: 'User not found' });
        }
    
        users.splice(userIndex, 1);
    
        res.status(200).json({ message: 'User deleted successfully' });
    });
    
app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });