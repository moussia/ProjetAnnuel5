import Disponibilite from '../model/Disponibilite';
import { dispo } from '../constants/Disponibilite.js';

export const createDisponibilite = async (req, res) => {
    const { id_pro } = req.body;

    var d = new Date(),
        hour = d.getHours(),
        min = d.getMinutes(),
        month = d.getMonth(),
        year = d.getFullYear(),
        sec = d.getSeconds(),
        day = d.getDate();
    const { date } = new Date(year + ',' + month + ',' + day + ',' + hour + ',' + min + ',' + sec)
    const disponibilite = new Disponibilite({
        id_pro,
        date,
        status: dispo.DISPONIBLE,
    });
    disponibilite.save();
    console.log('✅ Disponibilite enregistré');
    res.send();
}

export const createIndisponibilite = async (req, res) => {
    const { id_pro } = req.body;

    var d = new Date(),
        hour = d.getHours(),
        min = d.getMinutes(),
        month = d.getMonth(),
        year = d.getFullYear(),
        sec = d.getSeconds(),
        day = d.getDate();

    const { date } = new Date(year + ',' + month + ',' + day + ',' + hour + ',' + min + ',' + sec)

    const disponibilite = new Disponibilite({
        id_pro,
        date,
        status: dispo.INDISPONIBLE,
    });
    disponibilite.save();
    console.log('✅ Indisponibilite enregistré');
    res.send();
}