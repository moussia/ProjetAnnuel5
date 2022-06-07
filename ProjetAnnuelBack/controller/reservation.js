import Reservation from '../model/Reservation.js';
import { reserv } from '../constants/Reservation.js';

export const createReservationPhone = async (req, res) => {
    try {
        const reservation = new Reservation({
            id_parent: req.user._id,
            date: Date.now(),
            status: reserv.DEMANDE,
            type: reserv.TELEPHONE
        });
        reservation.save();
        console.log('✅ Demande reservation enregistré');
        res.send();
    } catch (error) {
        console.log(error);
        console.log('palpitation');
    }
}


export const createReservationTchat = async (req, res) => {
    try {
        const reservation = new Reservation({
            id_parent: req.user._id,
            date: Date.now(),
            status: reserv.DEMANDE,
            type: reserv.TCHAT
        });
        reservation.save();
        console.log('✅ Demande reservation tchat enregistré');
        res.send();
    } catch (error) {
        console.log(error);
        console.log('palpitation');
    }
}