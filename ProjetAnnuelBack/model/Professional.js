import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const schema = new Schema({
    id_pro: {
        type: Number,
        required: true
    },
    datedebut: {
        type: String,
        required: true
    },
    datefin: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }

});

export default model('Professional', schema);
