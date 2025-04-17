const express = require('express');
const router = express.Router();
const db = require('../db')
const { v4: uuidv4 } = require('uuid');

router.get('/testimonials', (req, res) => {
    res.json(db.testimonials);
});

router.get('/testimonials/random', (req, res) => {
    const randomTestimonial = db.testimonials[Math.floor(Math.random() * db.testimonials.length)];
    res.json(randomTestimonial);
});

router.get('/testimonials/:id', (req, res) => {
    const id = req.params.id
    const testimonial = db.testimonials.findIndex(item => String(item.id) === String(id));
    res.json(db.testimonials[testimonial]);
});

router.post('/testimonials', (req, res) => {
    const id = uuidv4();
    const { author, text } = req.body;

    if(!author || !text){
        res.json({ message: 'missing value!'});
    } else {
        db.testimonials.push({ id, author, text });
        res.json({ message: 'OK' });
    }
});

router.put('/testimonials/:id', (req, res) => {
    const id = req.params.id;
    const testimonial = db.testimonials.findIndex(item => String(item.id) === String(id));

    if (!testimonial) {
        return res.status(404).json({ message: 'Testimonial not found' });
    }

    const { author, text } = req.body;

    if (!author || !text) {
        return res.status(400).json({ message: 'Invalid data. Both author and text are required.' });
    }

    db.testimonials[testimonial] = { ...db.testimonials[testimonial], author, text };

    res.json({ message: 'OK' });
});

    
router.delete('/testimonials/:id', (req, res) => {
    const id = req.params.id
    const testimonial = db.testimonials.findIndex(item => String(item.id) === String(id));

    if(testimonial !== -1) {
        db.testimonials.splice(testimonial, 1);
        res.json({ message: 'OK' });
    } else {
        res.status(404).json({ message: 'Testimonial not found' }); // Obsługa błędu
    }
});

module.exports = router;