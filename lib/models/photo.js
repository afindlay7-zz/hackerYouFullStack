const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
    },
    description: {
        type: String,
    },
    url: {
        type: String, 
    },
    img: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('Photo', photoSchema);