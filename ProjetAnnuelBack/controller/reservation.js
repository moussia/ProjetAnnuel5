import Reservation from '../model/Reservation.js';
import { reserv } from '../constants/Reservation.js';

export const createReservationRdvDomicile = async (req, res) => {
    const { id_pro, id_parent, date, heure } = req.body;
    const reservation = new Reservation({
        id_pro,
        id_parent,
        date,
        heure,
        status: reserv.LIBRE,
        type: reserv.DOMICILE
    });
    reservation.save();
    console.log('✅ Reservation enregistré');
    res.send();
}