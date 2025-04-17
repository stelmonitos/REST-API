const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.get('/concerts', (req, res) => {
    res.json(db.concerts);
});

router.get('/concerts/random', (req, res) => {
    const random = db.concerts[Math.floor(Math.random() * db.concerts.length)];
    res.json(random);
});
  
router.get('/concerts/:id', (req, res) => {
    const id = req.params.id
    const concert = db.concerts.findIndex(item => String(item.id) === String(id)); // znajdz mi item z takim item.id (concerts/2 to jego item.id jest 2) jak id (czyli wlasnie np concerts/2)
    
    if (!concert){
        res.json({ message: 'wrong id!'});
    } else {
        res.json(db.concerts[concert]);
    }
});

router.post('/concerts', (req, res) => {
    const id = uuidv4();
    const { performer, genre, price, day, image } = req.body;
    if (!performer || !genre || !price || !day || !image || !id){
        res.json({ message: 'error!'});
    } else {
        db.concerts.push({ performer, genre, price, day, image, id})
        res.json({ message: 'OK'})
    }
});

router.put('/concerts/:id', (req, res) => {
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

router.delete('/concerts/:id', (req, res) => {
    const id = req.params.id;
    const concert = db.concerts.findIndex(item => String(item.id) === String(id));

    if(concert !== -1) {
        db.concerts.splice(concert, 1);
        res.json({ message: 'OK' });
    } else {
        res.status(404).json({ message: 'Testimonial not found' });
    }
});

module.exports = router;