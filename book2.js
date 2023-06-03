const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Simulated classroom booking database
const bookings = [];

// Endpoint for booking a classroom
app.post('/book', (req, res) => {
  const { classroom, date, startTime, endTime } = req.body;

  // Check if the classroom is available during the specified time
  const isAvailable = !bookings.some(booking => {
    return (
      booking.classroom === classroom &&
      booking.date === date &&
      booking.startTime <= endTime &&
      booking.endTime >= startTime
    );
  });

  if (isAvailable) {
    // Book the classroom
    bookings.push({ classroom, date, startTime, endTime });
    res.send('Classroom booked successfully!');
  } else {
    res.send('Classroom is not available at the specified time.');
  }
});

// Endpoint for canceling a classroom booking
app.post('/cancel', (req, res) => {
  const { classroom, date, startTime, endTime } = req.body;

  // Find and remove the matching booking from the database
  const book = bookings.findIndex(booking => {
    return (
      booking.classroom === classroom &&
      booking.date === date &&
      booking.startTime === startTime &&
      booking.endTime === endTime
    );
  });

  if (book !== -1) {
    bookings.splice(book, 1);
    res.send('Classroom booking canceled successfully!');
  } else {
    res.send('No matching booking found.');
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
