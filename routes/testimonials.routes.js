const express = require('express');
const router = express.Router();
const testimonialsController = require('../controllers/testimonials.controller')

router.get('/testimonials', testimonialsController.getAll);
router.get('/testimonials/:id', testimonialsController.getById);
router.post('/testimonials', testimonialsController.addNew);
router.put('/testimonials/:id', testimonialsController.change);
router.delete('/testimonials/:id', testimonialsController.deleteById);

module.exports = router;