const testimonial = require('../models/testimonials.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
    try {
        res.json(await testimonial.find({}));
    }
    catch (err) {
        res.status(500).json({message: err});
    }
};

exports.getById = async (req, res) => {
    try {
        const item = await testimonial.findById(req.params.id);
        if (!item) res.status(404).json({message: 'Not found'});
        else res.json(item);
    }
    catch (err) {
        res.status(500).json({message: err});
    }
};

exports.addNew = async (req, res) => {

    try {
        const {author, text} = req.body;
        const sanitizedAuthor = sanitize(author);
        const sanitizedText = sanitize(text);
        const newTestimonial = new testimonial({author: sanitizedAuthor, text: sanitizedText});
        await newTestimonial.save();
        res.json({message: 'OK'});

    } catch (err) {
        res.status(500).json({message: err});
    }
};

exports.change = async (req, res) => {

    const {author, text} = req.body;
    try {
        const item = await testimonial.findByIdAndUpdate(
            req.params.id,
            {$set: {author: author, text: text}},
            {new: true});
        if (!item) res.status(404).json({message: 'Not found'});
        else res.json(item);
    } catch (err) {
        res.status(500).json({message: err});
    }
};

exports.deleteById = async (req, res) => {
    try {
        const item = await (testimonial.findById(req.params.id));
        if (item) {
            await testimonial.deleteOne({_id: req.params.id});
            res.json(item);
        }
        else res.status(404).json({message: 'Not found...'});
    }
    catch (err) {
        res.status(500).json({message: err});
    }
};

