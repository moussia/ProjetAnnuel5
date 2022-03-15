const mongoose = require('mongoose')

const parentSchema = new mongoose.Schema({
    id_user: {
        type: Number
    },
    id_children: {
        type: Number
    },
    role: {
        enum: ['PARENT', 'TUTOR'],
        default: 'PARENT',
        required: true
    }

});

module.exports = mongoose.model('Parent', parentSchema);