import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import { disponibilite } from '../constants/Disponibilite';

const schema = new Schema({
    id_prof: {
        type: Number
    },
    date: {
        type: Date
    },
    status: {
        type: String,
        enum: [disponibilite.DISPONIBLE, disponibilite.INDISPONIBLE],
        default: disponibilite.INDISPONIBLE
    },
});

export default model('Disponibilite', schema);