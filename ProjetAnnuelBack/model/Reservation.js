import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import { reserv } from '../constants/Reservation.js';

const schema = new Schema({
    id_pro: {
        type: String
    },
    id_parent: {
        type: String
    },
    date: {
        type: Date,
    },
    status: {
        type: String,
        enum: [reserv.DEMANDE, reserv.FINI, reserv.LIBRE, reserv.RESERVE],
        default: reserv.DEMANDE
    },
    type: {
        type: String,
        enum: [reserv.TELEPHONE, reserv.TCHAT],
        default: reserv.TELEPHONE,
    }
});

export default model('Reservation', schema);