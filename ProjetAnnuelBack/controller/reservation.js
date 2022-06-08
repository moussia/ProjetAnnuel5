import Reservation from '../model/Reservation.js';
import { reserv } from '../constants/Reservation.js';


export const createDemandeReservation = async (req, res) => {
    try {
        const { choix, symptomes } = req.body;
        console.log("****", choix, symptomes)
        const reservation = new Reservation({
            id_parent: req.user._id,
            date: Date.now(),
            status: reserv.DEMANDE,
            choix,
            symptomes
        });
        reservation.save();
        console.log('✅ Demande reservation enregistré');
        console.log('-> ', choix, ' -> ', symptomes);
        res.send();
    } catch (error) {
        console.log(error);
    }
}