const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
// const mongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();
const testimonialsRoutes = require('./routes/testimonials.routes');
const seatsRoutes = require('./routes/seats.routes');
const concertsRoutes = require('./routes/concerts.routes');


const dbURI = process.env.NODE_ENV === 'production' ? `mongodb+srv://${process.env.user}:${process.env.password}@cluster0.zl5my.mongodb.net/myFirstDatabase?retryWrites=true&w=majority` : 'mongodb://localhost:27017/NewWaveDB';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));


app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


app.use('/api', testimonialsRoutes);
app.use('/api', seatsRoutes);
app.use('/api', concertsRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id = ' + socket.id);
});



