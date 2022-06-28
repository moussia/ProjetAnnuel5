import Disponibilite from '../model/Disponibilite.js';

export const createDisponibilite = async (req, res) => {
    try {
        const { disponibility } = req.body;

        await Disponibilite.findOneAndUpdate({ id_pro: req.user._id }, {
            id_parent: req.user._id,
            isDisponible: disponibility,
        }, { new: true, upsert: true })

        console.log('✅ Disponibilite enregistré');
        res.send(200);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(400);
    }
}

export const getDisponibilite = async (req, res) => {
    try {
        const disponibilite = await Disponibilite.findOne({ id_pro: req.user._id });
        res.send(disponibilite);
    } catch (error) {
        res.sendStatus(400);
    }
}