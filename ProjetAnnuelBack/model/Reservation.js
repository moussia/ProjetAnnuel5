import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import { reservation } from '../constants/Reservation.js';

const schema = new Schema({
    id_prof: {
        type: Number
    },
    id_parent: {
        type: Number
    },
    date: {
        type: String
    },
    heure: {
        type: String
    },
    status: {
        type: String,
        enum: [reservation.ANNULE, reservation.EN_COURS, reservation.FINI, reservation.LIBRE, reservation.RESERVE],
        default: reservation.LIBRE
    },
    type: {
        type: String,
        enum: [reservation.DOMICILE],
        default: reservation.DOMICILE
    }
});

export default model('Reservation', schema);