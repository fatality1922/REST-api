const concerts = require('../models/concerts.model');


exports.getAll = async (req, res) => {
    try {
        res.json(await concerts.find({}));
    }
    catch (err) {
        res.status(500).json({message: err});
    }
};

exports.getById = async (req, res) => {
    try {
        const item = await concerts.findById(req.params.id);
        if (!item) res.status(404).json({message: 'Not found'});
        else res.json(item);
    }
    catch (err) {
        res.status(500).json({message: err});
    }
};

exports.addNew = async (req, res) => {

    try {
        const {performer, genre, price, day, image} = req.body;
        const newseats = new concerts({performer: performer, genre: genre, price: price, day: day, image: image});
        await newseats.save();
        res.json({message: 'OK'});

    } catch (err) {
        res.status(500).json({message: err});
    }
};

exports.change = async (req, res) => {

    const {performer, genre, price, day, image} = req.body;
    try {
        const item = await concerts.findByIdAndUpdate(
            req.params.id,
            {$set: {performer: performer, genre: genre, price: price, day: day, image: image}},
            {new: true});
        if (!item) res.status(404).json({message: 'Not found'});
        else res.json(item);
    } catch (err) {
        res.status(500).json({message: err});
    }
};

exports.deleteById = async (req, res) => {
    try {
        const item = await (concerts.findById(req.params.id));
        if (item) {
            await concerts.deleteOne({_id: req.params.id});
            res.json(item);
        }
        else res.status(404).json({message: 'Not found...'});
    }
    catch (err) {
        res.status(500).json({message: err});
    }
};

