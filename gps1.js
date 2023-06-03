const express = require('express');
const app = express();

let vehiclePosition = { lat: 37.7749, lng: -122.4194 };

// Endpoint for retrieving the vehicle position
app.get('/position', (req, res) => {
  res.json(vehiclePosition);
});

// Endpoint for updating the vehicle position
app.post('/position', (req, res) => {
  const { lat, lng } = req.body;
  vehiclePosition = { lat, lng };
  res.send('Vehicle position updated successfully!');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
