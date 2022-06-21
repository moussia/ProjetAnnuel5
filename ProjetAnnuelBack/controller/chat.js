import mongoose from "mongoose";
import { reserv } from "../constants/Reservation.js";
import Reservation from "../model/Reservation.js";

export const closeChat = async (req, res) => {
    const { reservationId } = req.body;
    await Reservation.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(reservationId) }, { status: reserv.FINI });
    res.sendStatus(200);
}

export const isChatExist = async (req, res) => {
    // Lier avec l'id de la reservation
    const { reservationId } = req.params;
    const reservation = await Reservation.findOne({ _id: new mongoose.Types.ObjectId(reservationId) }, { status: reserv.RESERVE }).lean();
    res.send(reservation !== null);
}

