const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    lastname: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    email: {
        type: email,
        required: true
    },
    password: {
        type: password,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    role: {
        enum: ['PARENT', 'PROFESSIONAL'],
        default: 'PARENT'
    },
    birthdate: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    zipcode: {
        type: Number,
        required: true
    }


});

module.exports = mongoose.model('User', userSchema);