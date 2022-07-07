import User from '../model/User.js';

export const createDisponibilite = async (req, res) => {
    console.log("createDisponibilite, route: /dispo/update");

    try {
        const { disponibility } = req.body;

        const user = await User.findOneAndUpdate({ _id: req.user._id }, {
            isDisponible: disponibility,
        }, { new: true, upsert: true })

        console.log('✅ Disponibilite enregistré');
        res.send(user);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(400);
    }
}

export const getDisponibilite = async (req, res) => {
    console.log("getDisponibilite, route: /dispo");

    try {
        const disponibilite = await User.findOne({ _id: req.user._id }, { isDisponible: 1 });
        res.send(disponibilite);
    } catch (error) {
        res.sendStatus(400);
    }
}

