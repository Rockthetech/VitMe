const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Simulated user database
const users = [];

// Endpoint for user registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check if the username is already taken
  if (users.some(user => user.username === username)) {
    return res.status(400).send('Username is already taken.');
  }

  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Store the user in the database
    users.push({ username, password: hashedPassword });

    res.send('User registered successfully!');
  } catch (error) {
    res.status(500).send('An error occurred during registration.');
  }
});

// Endpoint for user login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find the user in the database
  const user = users.find(user => user.username === username);

  if (!user) {
    return res.status(404).send('User not found.');
  }

  try {
    // Compare the provided password with the hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      res.send('Login successful!');
    } else {
      res.status(401).send('Incorrect password.');
    }
  } catch (error) {
    res.status(500).send('An error occurred during login.');
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
