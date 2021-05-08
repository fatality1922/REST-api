const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonials.controller')

router.get('/testimonials', testimonialController.getAll);
router.get('/testimonials/:id', testimonialController.getById);
router.post('/testimonials', testimonialController.addNew);
router.put('/testimonials/:id', testimonialController.change);
router.delete('/testimonials/:id', testimonialController.deleteById);

module.exports = router;