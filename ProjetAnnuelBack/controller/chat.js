import { reserv } from "../constants/Reservation.js";
import Reservation from "../model/Reservation.js";

export const closeChat = async (req, res) => {
    // Lier avec l'id de la reservation
    await Reservation.findOneAndUpdate({ status: reserv.FINI });
    res.sendStatus(200);
}