const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];
  
app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const { name, email } = req.body;
  
    const user = users.find(u => u.id === userId);
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    user.name = name;
    user.email = email;
  
    res.status(200).json(user);
  });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});