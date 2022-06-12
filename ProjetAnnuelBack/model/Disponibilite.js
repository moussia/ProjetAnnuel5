import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const schema = new Schema({
    id_pro: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
    date: {
        type: Date
    },
    isDisponible: {
        type: Boolean,
        default: false
    },
});

export default model('Disponibilite', schema);