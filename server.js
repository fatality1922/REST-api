const express = require('express');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');

const app = express();

const status = 'OK';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const testimonialsRoutes = require('./routes/testimonials.routes')
app.use('/api', testimonialsRoutes);


app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8001, () => {
  console.log('Server is running on port: 8001');
});

