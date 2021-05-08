const seats = require('../models/seats.model');


exports.getAll = async (req, res) => {
    try {
        res.json(await seats.find({}));
    }
    catch (err) {
        res.status(500).json({message: err});
    }
};

exports.getById = async (req, res) => {
    try {
        const item = await seats.findById(req.params.id);
        if (!item) res.status(404).json({message: 'Not found'});
        else res.json(item);
    }
    catch (err) {
        res.status(500).json({message: err});
    }
};

exports.addNew = async (req, res) => {

    try {
        const {day, seat, client, email} = req.body;
        const newseats = new seats({day: day, seat: seat, client: client, email: email});
        await newseats.save();
        res.json({message: 'OK'});

    } catch (err) {
        res.status(500).json({message: err});
    }
};

exports.change = async (req, res) => {

    const {day, seat, client, email} = req.body;
    try {
        const item = await seats.findByIdAndUpdate(
            req.params.id,
            {$set: {day: day, seat: seat, client: client, email: email}},
            {new: true});
        if (!item) res.status(404).json({message: 'Not found'});
        else res.json(item);
    } catch (err) {
        res.status(500).json({message: err});
    }
};

exports.deleteById = async (req, res) => {
    try {
        const item = await (seats.findById(req.params.id));
        if (item) {
            await seats.deleteOne({_id: req.params.id});
            res.json(item);
        }
        else res.status(404).json({message: 'Not found...'});
    }
    catch (err) {
        res.status(500).json({message: err});
    }
};

