// import { roles } from "../constants/Roles";
// import User from "../model/User";

import Reservation from "../model/Reservation";



// export const proToVerify = async (req, res) => {
//     const pro = await User.find({ role: roles.PRO, activated: false }, { password: 0 });
//     res.send(pro);
// }

// il faut recuperer les reservations ou l'id du pro corresponds a l'id de la personne connecte
export const historiqueDemandesForAdmin = async (req, res) => {
    try {
        const demandes = await Reservation.find();
        console.log(demandes)
        res.send(demandes);
    } catch (error) {
        console.log(error);
    }
}