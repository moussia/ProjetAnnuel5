import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import { reserv } from '../constants/Reservation.js';

const schema = new Schema({
    id_pro: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    id_parent: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date
    },
    status: {
        type: String,
        enum: [reserv.DEMANDE, reserv.FINI, reserv.LIBRE, reserv.RESERVE],
        default: reserv.DEMANDE
    },
    choix: {
        type: String,
    },
    symptomes: {
        type: String,
    }
});

export default model('Reservation', schema);