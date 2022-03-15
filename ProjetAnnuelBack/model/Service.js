const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    id_prof: {
        type: Number
    },
    name: {
        enum: ['CRY', 'SICK'],
        default: 'CRY',
        required: true
    },
    price: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Service', serviceSchema);