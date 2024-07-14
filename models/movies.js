const { default: mongoose } = require('mongoose');
//const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    releasedDate: {
        type: String, /* Date, */
        required: true,
        /* default: Date.now */
    }
});

module.exports = mongoose.model('movies', moviesSchema);