const express = require('express');
const db = require('./db.js')
const { v4: uuidv4 } = require('uuid');
const app = express();


const testimonialRoutes = require('./routes/testimonials.routes.js');
const concertRoutes = require('./routes/concert.routes.js');
const seatRoutes = require('./routes/seats.routes.js')

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ENDPOINTS
app.use('/api', testimonialRoutes);
app.use('/api', concertRoutes);
app.use('/api', seatRoutes);

app.listen(8000, () =>{
    console.log('Server is running on port: 8000')
})