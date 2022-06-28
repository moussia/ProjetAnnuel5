import Disponibilite from "../model/Disponibilite.js";
import Reservation from "../model/Reservation.js";

export const getAllDemandes = async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({ date: 'desc' }).populate(['id_parent', 'id_pro']);
        res.send(reservations);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}


export const getDisponibilitePro = async (req, res) => {
    try {
        const disponibilite = await Disponibilite.findOne({ id_pro: req.user._id });
        res.send(disponibilite);
    } catch (error) {
        res.sendStatus(400);
    }
}