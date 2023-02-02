const express = require('express');
const bodyParser = require('body-parser');
const connect = require('./conn/database');

const app =  express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const authRoutes = require('./routes/auth');

app.use('/api/user', authRoutes);

app.get('/', (req, res) => {
    res.json({
        status: true,
        message: 'it works!!'
    });
});

connect.start();

const PORT = process.env.PORT || 9123;

app.listen(PORT, () => {
    console.log('Server running on port: ' + PORT);
});