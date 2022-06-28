import Reservation from "../model/Reservation.js";

export const getAllDemandes = async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({ date: 'desc' }).populate(['id_parent', 'id_pro']);
        res.send(reservations);
    } catch (error) {
        console.log(error);
    }
}
