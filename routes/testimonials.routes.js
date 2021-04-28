const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const router = express.Router();

const status = 'OK';


router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials.filter(item => item.id === parseInt(req.params.id)));
});

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;
  db.testimonials.push({
    id: uuidv4(),
    author,
    text,
  });

  return res.json(status);
})


router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;
  const item = db.testimonials.find(item => item.id == req.params.id);
  if (item) {
      item.author = author;
      item.text = text;

      res.json(status);
  } else {
      res.json({ message: `this post with ${req.params.id} doesn't exists` })
  }
});

router.route('/testimonials/:id').delete((req, res) => {
  const record = db.testimonials.find((el) => el.id == req.params.id);
  const recordIndex = db.testimonials.indexOf(record);
  db.testimonials.splice(recordIndex, 1);
  res.json(status);
});

module.exports = router;

