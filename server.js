const express = require('express');
const db = require('./db.js')
const { v4: uuidv4 } = require('uuid');
const app = express();

app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
});

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//ednpoints 

app.get('/testimonials', (req, res) => {
    res.json(db.testimonials);
    console.log('hello')
});

app.get('/testimonials/random', (req, res) => {
    const randomTestimonial = db.testimonials[Math.floor(Math.random() * db.testimonials.length)];
    res.json(randomTestimonial);
});

app.get('/testimonials/:id', (req, res) => {
    const id = req.params.id
    const testimonial = db.testimonials.findIndex(item => String(item.id) === String(id));
    res.json(db.testimonials[testimonial]);
});

app.post('/testimonials', (req, res) => {
    const id = uuidv4();
    const { author, text } = req.body;

    if(!author || !text){
        res.json({ message: 'missing value!'});
    } else {
        db.testimonials.push({ id, author, text });
        res.json({ message: 'OK' });
    }
});

app.put('/testimonials/:id', (req, res) => {
    const id = req.params.id;
    const testimonial = db.testimonials.find(item => item.id === parseInt(id));

    if (!testimonial) {
        return res.status(404).json({ message: 'Testimonial not found' });
    }

    const { author, text } = req.body;

    if (!author || !text) {
        return res.status(400).json({ message: 'Invalid data. Both author and text are required.' });
    }

    testimonial.author = author;
    testimonial.text = text;

    res.json(testimonial);
});
    
app.delete('/testimonials/:id', (req, res) => {
    const id = req.params.id
    const testimonial = db.testimonials.findIndex(item => String(item.id) === String(id));

    if(testimonial !== -1) {
        db.testimonials.splice(testimonial, 1);
        res.json({ message: 'OK' });
    } else {
        res.status(404).json({ message: 'Testimonial not found' }); // Obsługa błędu
    }
})
  
  

app.listen(8000, () =>{
    console.log('Server is running on port: 8000')
})