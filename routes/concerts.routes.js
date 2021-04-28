const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const router = express.Router();

const status = 'OK';


router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
    res.json(db.concerts.filter(item => item.id === parseInt(req.params.id)));
});


router.route('/concerts').post((req, res) => {
    const { performer, genre, price, day, image } = req.body;
    db.concerts.push({
        id: uuidv4(),
        performer,
        genre,
        price,
        day,
        image,
    });

    return res.json(status);
})


router.route('/concerts/:id').put((req, res) => {
    const { performer, genre, price, day, image } = req.body;
    const item = db.concerts.find(item => item.id == req.params.id);
    if (item) {
        item.performer = performer;
        item.genre = genre;
        item.price = price;
        item.day = day;
        item.image = image;

        res.json(status);
    } else {
        res.json({ message: `this post with ${req.params.id} doesn't exists` })
    }

});

router.route('/concerts/:id').delete((req, res) => {
    const record = db.concerts.find((el) => el.id == req.params.id);
    const recordIndex = db.concerts.indexOf(record);
    db.concerts.splice(recordIndex, 1);
    res.json(status);
});

module.exports = router;

