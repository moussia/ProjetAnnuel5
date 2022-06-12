import Reservation from "../model/Reservation.js";
import User from "../model/User.js";

export const getContacts = async (req, res) => {
    try {
        const contactsIds = await Reservation.find(
            { id_pro: req.user._id, status: 'RESERVE', choix: 'chat' }, { id_parent: 1 }
        ).distinct('id_parent');
        const contacts = await User.find({ _id: { $in: contactsIds } }, { firstname: 1, lastname: 1 });
        console.log(contacts);
        res.send(contacts);
    } catch (err) {
        console.log(err);
    }
}


export const getContactsPro = async (req, res) => {
    try {
        const contactsIds = await Reservation.find(
            { id_parent: req.user._id, status: 'RESERVE', choix: 'chat' }, { id_pro: 1 }
        ).distinct('id_pro');
        const contacts = await User.find({ _id: { $in: contactsIds } }, { firstname: 1, lastname: 1 });
        console.log(contacts);
        res.send(contacts);
    } catch (err) {
        console.log(err);
    }
}