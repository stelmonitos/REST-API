const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors')


const testimonialRoutes = require('./routes/testimonials.routes.js');
const concertRoutes = require('./routes/concert.routes.js');
const seatRoutes = require('./routes/seats.routes.js')

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));


// ENDPOINTS
app.use('/api', testimonialRoutes);
app.use('/api', concertRoutes);
app.use('/api', seatRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});