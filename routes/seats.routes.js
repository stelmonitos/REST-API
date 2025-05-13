const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.get('/seats', (req, res) => {
    res.json(db.seats);
});

router.get('/seats/random', (req, res) => {
    const randomSeat = db.seats[Math.floor(Math.random() * db.seats.length)];
    res.json(randomSeat);
});

router.get('/seats/:id', (req, res) => {
    const id = req.params.id;
    const seat = db.seats.findIndex(item => String(item.id) === String(id));
    if (!seat){
       return res.json({ message: 'wrong id!'});
    } else {
       return res.json(db.seats[seat]);
    }
});

router.post('/seats', (req, res) => {
    const id = uuidv4();
    const { day, seat, client, email } = req.body
    const isTaken = db.seats.some(item => String(item.seat) === String(seat) && item.day === day);
    if (!day || !seat || !client || !day || !email || !id){
       return res.json({ message: 'error!'});
    } 
    if(isTaken){
        return res.status(409).json({ message: 'This seat is already taken!' });
    } else {
        const newSeat = { day, seat, client, email, id };
        db.seats.push(newSeat);
        res.json({ message: 'OK' })
    }
    
});

router.put('/seats/:id', (req, res) => {
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

router.delete('/seats/:id', (req, res) => {
    const id = req.params.id;
    const seat = db.seats.findIndex(item => String(item.id) === String(id));

    if(seat !== -1) {
        db.seats.splice(seat, 1);
        res.json({ message: 'OK' });
    } else {
        res.status(404).json({ message: 'Seat not found' });
    }
});

module.exports = router;