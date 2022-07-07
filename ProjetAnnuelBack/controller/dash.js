import Reservation from "../model/Reservation.js";

export const getAllDemandes = async (req, res) => {
    console.log("getAllDemandes, route: /getAllDemandes");
    try {
        const reservations = await Reservation.find().sort({ createdAt: 'desc' }).populate(['id_parent', 'id_pro']);
        res.send(reservations);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}
