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

app.get('/concerts', (req, res) => {
    res.json(db.concerts);
});

app.get('/concerts/random', (req, res) => {
    const random = db.concerts[Math.floor(Math.random() * db.concerts.length)];
    res.json(random);
});
  
app.get('/concerts/:id', (req, res) => {
    const id = req.params.id
    const concert = db.concerts.findIndex(item => String(item.id) === String(id)); // znajdz mi item z takim item.id (concerts/2 to jego item.id jest 2) jak id (czyli wlasnie np concerts/2)
    
    if (!concert){
        res.json({ message: 'wrong id!'});
    } else {
        res.json(db.concerts[concert]);
    }
});

app.post('/concerts', (req, res) => {
    const id = uuidv4();
    const { performer, genre, price, day, image } = req.body;
    if (!performer || !genre || !price || !day || !image || !id){
        res.json({ message: 'error!'});
    } else {
        db.concerts.push({ performer, genre, price, day, image, id})
        res.json({ message: 'OK'})
    }
});

app.put('/concerts/:id', (req, res) => {
    const id = req.params.id
    const concert = db.concerts.findIndex(item => String(item.id) === String(id))
    const { performer, genre, price, day, image } = req.body;
    if (!concert){
        res.json({ message: 'wrong id!'});
    } else if (!performer || !genre || !price || !day || !image ){
        res.json({ message: 'error!'})
    } else {
        db.concerts[concert] = { ...db.concerts[concert], performer, genre, price, day, image}; // *...db.concerts[concert]* =  stworz mi takie samo i usun tamto (obiekt np id:3 "performer": "Maybell Haley", genre itd)
                                                                                                // *performer, genre, price, day, image* i zastap argumentami z req.body
        res.json({  message: 'OK' });
    }
})

app.delete('/concerts/:id', (req, res) => {
    const id = req.params.id;
    const concert = db.concerts.findIndex(item => String(item.id) === String(id));

    if(concert !== -1) {
        db.concerts.splice(concert, 1);
        res.json({ message: 'OK' });
    } else {
        res.status(404).json({ message: 'Testimonial not found' });
    }
});

//SEATS

app.get('/seats', (req, res) => {
    res.json(db.seats);
});

app.get('/seats/random', (req, res) => {
    const randomSeat = db.seats[Math.floor(Math.random() * db.seats.length)];
    res.json(randomSeat);
});

app.get('/seats/:id', (req, res) => {
    const id = req.params.id;
    const seat = db.seats.findIndex(item => String(item.id) === String(id));
    if (!seat){
        res.json({ message: 'wrong id!'});
    } else {
        res.json(db.seats[seat]);
    }
});

app.post('/seats', (req, res) => {
    const id = uuidv4();
    const { day, seat, client, email } = req.body

    if (!day || !seat || !client || !day || !email || !id){
        res.json({ message: 'error!'});
    } else {
        db.seats.push({ day, seat, client, email, id })
        res.json({ message: 'OK' })
    }
    
});

app.put('/seats/:id', (req, res) => {
    const id = req.params.id;
    const seatIndex = db.seats.findIndex(item => String(item.id) === String(id));
    const { day, seat, client, email } = req.body;

    if (!seatIndex){
        res.status(404).json({ message: 'seat not found!'});
    } 
    
    if (!day || !seat || !client || !day || !email || !id){
        res.json({ message: 'error!'});
    }
        db.seats[seatIndex] = {...db.seats[seatIndex], day, seat, client, email}
        res.json({ message: 'OK' })
});

app.delete('/seats/:id', (req, res) => {
    const id = req.params.id;
    const seat = db.seats.findIndex(item => String(item.id) === String(id));

    if(seat !== -1) {
        db.seats.splice(seat, 1);
        res.json({ message: 'OK' });
    } else {
        res.status(404).json({ message: 'Seat not found' });
    }
});

app.listen(8000, () =>{
    console.log('Server is running on port: 8000')
})