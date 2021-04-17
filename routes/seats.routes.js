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

router.route('/seats/random').get((req, res) => {
    res.json(db.seats.Math.floor(Math.random() * db.seats.length));
});

router.route('/seats').post((req, res) => {
    const { day, seat, client, email } = req.body;
    db.seats.push({
        id: uuidv4(),
        day,
        seat,
        client,
        email,
    });

    return res.json(status);
})


router.route('/seats/:id').put((req, res) => {
    const { day, seat, client, email } = req.body;
    for (let i = 0; i < db.seats.length; i++) {
        if (db.seats[i].id === parseInt(req.params.id)) {
            db.seats[req.params.id].day = day;
            db.seats[req.params.id].seat = seat;
            db.seats[req.params.id].client = client;
            db.seats[req.params.id].email = email;

            res.json(status);
        } else {
            res.json({ message: `this post with ${req.params.id} doesn't exists` })
        }
    }
});

router.route('/seats/:id').delete((req, res) => {
    const record = db.seats.find((el) => el.id == req.params.id);
    const recordIndex = db.seats.indexOf(record);
    db.seats.splice(recordIndex, 1);
    res.json(status);
});

module.exports = router;

