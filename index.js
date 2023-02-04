const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./conn/database');
const authRoutes = require('./routes/auth');

require('dotenv').config()

const app =  express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
connection.start();


app.use('/api/user', authRoutes);

app.get('/', (req, res) => {
    res.json({
        status: true,
        message: 'it works!!'
    });
});


const PORT = process.env.PORT || 9123;

app.listen(PORT, () => {
    console.log('Server running on port: ' + PORT);
});