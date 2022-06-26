import Reservation from "../model/Reservation.js";

// export const proToVerify = async (req, res) => {
//     const pro = await User.find({ role: roles.PRO, activated: false }, { password: 0 });
//     res.send(pro);
// }


// export const historiqueDemandesForAdmin = async (req, res) => {
//     try {
//         const demandes = await Reservation.find();
//         console.log(demandes)
//         res.send(demandes);
//     } catch (error) {
//         console.log(error);
//     }
// }

export const getAllDemandes = async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({ date: 'desc' });
        console.log('-> ', reservations);
        res.send(reservations);
    } catch (error) {
        console.log(error);
    }
}
