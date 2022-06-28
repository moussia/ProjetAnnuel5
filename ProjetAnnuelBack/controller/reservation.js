import Reservation from '../model/Reservation.js';
import { reserv } from '../constants/Reservation.js';
import User from '../model/User.js';
import mongoose from 'mongoose';
import Disponibilite from '../model/Disponibilite.js';
import { sendToProForDemandeAide } from '../utils/mail.js';


export const createDemandeReservation = async (req, res) => {
    try {
        const { choix, symptomes } = req.body;
        const reservation = new Reservation({
            id_parent: mongoose.Types.ObjectId(req.user._id),
            date: Date.now(),
            status: reserv.DEMANDE,
            choix,
            symptomes
        });
        reservation.save();
        console.log('✅ Demande reservation enregistré');
        const pros = await Disponibilite.find({ isDisponible: true }).lean().limit(5).populate('id_pro');
        console.table(pros);
        pros.forEach((pro) => {
            console.log(pro.id_pro);
            sendToProForDemandeAide(pro.id_pro.email)
        });
        console.log(reservation._id);
        res.send({ _id: reservation._id, waitingTime: await getWaitingTime() });
    } catch (error) {
        console.log(error);
    }
}

const getWaitingTime = async () => {
    try {
        const nbDispo = await Disponibilite.find({ isDisponible: true }).lean().count();
        const nbDemande = await Reservation.find({ status: reserv.DEMANDE }).lean().count();
        console.log(nbDispo, nbDemande, (nbDemande / nbDispo) * 15);
        return (nbDemande / nbDispo) * 15;
    } catch (error) {
        // res.sendStatus(400);
        console.log(error);
    }

}

export const getDemandeReservation = async (req, res) => {
    try {
        const pro = await Reservation.find({ $or: [{ status: "DEMANDE" }, { status: "RESERVE", id_pro: req.user._id }] }).sort({ date: 'desc' });
        console.log('-> ', pro);
        res.send(pro);
    } catch (error) {
        res.sendStatus(400);
    }
}

export const closeReservation = async (req, res) => {
    try {
        await Reservation.findOneAndUpdate({ id_parent: req.user._id, status: reserv.DEMANDE }, { status: reserv.ANNULE }, {
            new: true
        });
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(400);
    }
}

export const finishReservation = async (req, res) => {
    const reservationId = req.params.reservationId;
    try {
        const updateReservation = await Reservation.findOneAndUpdate({ _id: reservationId }, { status: reserv.FINI }, {
            new: true
        });
        res.send(updateReservation);
    } catch (error) {
        res.sendStatus(400);
    }
}



export const takeDemandeId = async (req, res) => {
    const demand = req.params.demandeId;
    const updateDemand = await Reservation.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(demand) },
        { status: 'RESERVE', id_pro: mongoose.Types.ObjectId(req.user._id) },
        { new: true }
    );
    // EnvoiMailAuPourCompteValide(req.user.email, req.user.lastname, req.user.email);
    res.send(updateDemand);
}

export const getPhone = async (req, res) => {
    try {
        const demandId = req.params.demandId;
        console.log("demande id -> ", demandId);
        const DemandeParent = await Reservation.findOne({
            _id: new mongoose.Types.ObjectId(demandId),
            id_pro: req.user._id,
            status: 'RESERVE',
            choix: 'tel'
        });
        if (DemandeParent) {
            const phone = await User.findById(new mongoose.Types.ObjectId(DemandeParent.id_parent), { phone: 1 });
            res.send(phone);
        }
        else res.sendStatus(401);
    } catch (err) {
        console.log(err);
    }
}

export const getDemandes = async (req, res) => {
    try {
        const demandes = await Reservation.find({ status: reserv.DEMANDE }, { id_parent: 0 });
        console.log(demandes)
        res.send(demandes);
    } catch (error) {
        console.log(error);
    }
}


export const getDemandesFinish = async (req, res) => {
    try {
        const demandes = await Reservation.find({ status: reserv.FINI }, { id_parent: 0 });
        console.log(demandes)
        res.send(demandes);
    } catch (error) {
        console.log(error);
    }
}

export const historiqueForParent = async (req, res) => {
    try {
        const demandes = await Reservation.find({ id_parent: req.user._id }, { id_parent: 0 });
        console.log(demandes)
        res.send(demandes);
    } catch (error) {
        console.log(error);
    }
}

// il faut recuperer les reservations ou l'id du pro corresponds a l'id de la personne connecte
export const historiqueForPro = async (req, res) => {
    try {
        const demandes = await Reservation.find({ id_pro: req.user._id }, { id_parent: 0 });
        console.log(demandes)
        res.send(demandes);
    } catch (error) {
        console.log(error);
    }
}