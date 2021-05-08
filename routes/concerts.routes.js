const express = require('express');
const router = express.Router();
const concertController = require('../controllers/concerts.controller')

router.get('/concerts', concertController.getAll);
router.get('/concerts/:id', concertController.getById);
router.post('/concerts', concertController.addNew);
router.put('/concerts/:id', concertController.change);
router.delete('/concerts/:id', concertController.deleteById);

module.exports = router;