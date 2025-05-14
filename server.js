const express = require('express');
const app = express();
const cors = require('cors')


const testimonialRoutes = require('./routes/testimonials.routes.js');
const concertRoutes = require('./routes/concert.routes.js');
const seatRoutes = require('./routes/seats.routes.js')

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


// ENDPOINTS
app.use('/api', testimonialRoutes);
app.use('/api', concertRoutes);
app.use('/api', seatRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.listen(8000, () =>{
    console.log('Server is running on port: 8000')
})