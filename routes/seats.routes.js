const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const router = express.Router();

const status = 'OK';


router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
    res.json(db.seats.filter(item => item.id === parseInt(req.params.id)));
});

router.route('/seats').post((req, res) => {
    const { day, seat, client, email } = req.body;


    const seatTaken = db.seats.some(item => item.day === req.params.day && data.seat == req.params.seat);
    if (seatTaken) {
        res.status(403).json({ message: 'The seat is already taken' });
    } else {
        db.seats.push({
            id: uuidv4(),
            day,
            seat,
            client,
            email
        });
        res.json({ message: 'OK' })
        req.io.emit('seatsUpdated', db.seats);
    }
})


router.route('/seats/:id').put((req, res) => {
    const { day, seat, client, email } = req.body;
    const item = db.seats.find(item => item.id == req.params.id);
    if (item) {
        item.day = day;
        item.seat = seat;
        item.client = client;
        item.email = email;

        res.json(status);
    } else {
        res.json({ message: `this post with ${req.params.id} doesn't exists` })
    }
});

router.route('/seats/:id').delete((req, res) => {
    const record = db.seats.find((el) => el.id == req.params.id);
    const recordIndex = db.seats.indexOf(record);
    db.seats.splice(recordIndex, 1);
    res.json(status);
});

module.exports = router;

