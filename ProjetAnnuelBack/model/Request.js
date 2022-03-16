const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
    id_parent: {
        type: Number
    },
    hours: {
        type: Date
    },
    description: {
        type: String,
        required: true
    },
    status: {
        enum: ['ACTIVATED', 'DELETED', 'FINISHED', 'CONTINUED'],
        default: 'ACTIVATED'
    }

});

module.exports = mongoose.model('Resquest', requestSchema);