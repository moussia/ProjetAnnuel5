const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    id_parent: {
        type: Number
    },
    id_prof: {
        type: Number
    },
    id_service: {
        type: Number
    },
    status: {
        enum: ['INPROGRESS', 'FINISHED', 'CANCELED', 'REIMBURSED'],
        required: true
    },
    price: {
        type: Number
    }

});

module.exports = mongoose.model('Payment', paymentSchema);