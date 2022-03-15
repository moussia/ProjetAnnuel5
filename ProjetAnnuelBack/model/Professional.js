const mongoose = require('mongoose')

const professionalSchema = new mongoose.Schema({
    id_user: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true
    },
    // pdf du cv
    resume: {
        type: String,
        required: true
    },
    biography: {
        type: String,
        required: false
    }

});

module.exports = mongoose.model('Professional', professionalSchema);