const express = require('express');
const router = express.Router();
const seatController = require('../controllers/seats.controller')

router.get('/seats', seatController.getAll);
router.get('/seats/:id', seatController.getById);
router.post('/seats', seatController.addNew);
router.put('/seats/:id', seatController.change);
router.delete('/seats/:id', seatController.deleteById);

module.exports = router;