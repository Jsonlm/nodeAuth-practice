const mongoose = require('mongoose');

const start = () => {
    mongoose.set('strictQuery', false);

    mongoose.connect(`mongodb://localhost:27017/${process.env.DBNAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log(
        'Base de datos conectada'
    )).catch(e => console.log(
        'error db:', e
    ));
}

module.exports = { start };