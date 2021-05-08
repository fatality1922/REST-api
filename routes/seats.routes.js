const express = require('express');
const router = express.Router();
const seatsController = require('../controllers/seats.controller')

router.get('/seats', seatsController.getAll);
router.get('/seats/:id', seatsController.getById);
router.post('/seats', seatsController.addNew);
router.put('/seats/:id', seatsController.change);
router.delete('/seats/:id', seatsController.deleteById);

module.exports = router;