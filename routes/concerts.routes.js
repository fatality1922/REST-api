const express = require('express');
const router = express.Router();
const concertsController = require('../controllers/concerts.controller')

router.get('/concerts', concertsController.getAll);
router.get('/concerts/:id', concertsController.getById);
router.post('/concerts', concertsController.addNew);
router.put('/concerts/:id', concertsController.change);
router.delete('/concerts/:id', concertsController.deleteById);

module.exports = router;