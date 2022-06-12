import Reservation from '../model/Reservation.js';
import { reserv } from '../constants/Reservation.js';
import User from '../model/User.js';
import mongoose from 'mongoose';


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
        res.send();
    } catch (error) {
        console.log(error);
    }
}

export const getDemandeReservation = async (req, res) => {
    try {
        const pro = await Reservation.find({ $or: [{ status: "DEMANDE" }, { status: "RESERVE", id_pro: req.user._id }] });
        res.send(pro);
    } catch (error) {
        console.log(error);
    }
}

export const takeDemandeId = async (req, res) => {
    const demand = req.params.demandeId;
    const updateDemand = await Reservation.findOneAndUpdate(
        { _id: demand },
        { status: 'RESERVE', id_pro: mongoose.Types.ObjectId(req.user._id) },
        { new: true }
    );
    // EnvoiMailAuPourCompteValide(req.user.email, req.user.lastname, req.user.email);
    res.send(updateDemand);
}

export const getPhone = async (req, res) => {
    try {
        const demandId = req.params.demandId;
        const DemandeParent = await Reservation.findOne({ _id: demandId, id_pro: req.user._id, status: 'RESERVE', choix: 'tel' });
        if (DemandeParent) {
            const phone = await User.findById(new mongoose.Types.ObjectId(DemandeParent.id_parent), { phone: 1 });
            res.send(phone);
        }
        else res.sendStatus(401);
    } catch (err) {
        console.log(err);
    }
}