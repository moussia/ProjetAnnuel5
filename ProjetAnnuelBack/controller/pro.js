import User from '../model/User.js';
import bcrypt from 'bcrypt';
import { EnvoiMailAuProPourCompteValide, EnvoiMailAuProPourInscription, sendToAdminValidateComptePro } from '../utils/mail.js';
import { roles } from '../constants/Roles.js';
import jwt from 'jsonwebtoken';

export const createPro = async (req, res) => {
    // create and save new user pro in DB
    const { email, password, firstname, lastname, phone, birthday, address, city, country, zipcode, job } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = new User({
        email,
        password: hash,
        firstname,
        lastname,
        phone,
        birthday,
        address,
        city,
        country,
        zipcode,
        job,
        role: roles.PRO
    });
    user.save();
    console.log('✅ Inscription Pro');
    const link = jwt.sign({
        data: { _id: user._id }
    }, process.env.JWT_ACTIVATE, { expiresIn: '24h' });
    EnvoiMailAuProPourInscription(email, lastname, `${process.env.URL_FRONT}/activatedMail?token=${link}`); //mail pour validé l'inscription
    sendToAdminValidateComptePro(lastname, email); // mail à l'admin pour validé le compte pro
    res.sendStatus(200);
}

export const activatePro = async (req, res) => {
    const pro = req.params.proId;
    console.log(pro);
    const updatePro = await User.findOneAndUpdate({ _id: pro }, { activatedByAdmin: true }, {
        new: true
    });
    EnvoiMailAuProPourCompteValide(req.user.email, req.user.lastname, req.user.email);
    res.send(updatePro);
}

export const updatePro = async (req, res) => {
    const updatePro = await User.findOneAndUpdate({ _id: req.user._id }, req.body, {
        new: true
    });
    res.send(updatePro);
}

export const getPro = async (req, res) => {
    const pro = await User.find({ role: roles.PRO }, { password: 0 });
    res.send(pro);
}

export const deletePro = async (req, res) => {
    User.deleteOne({ _id: req.params.proId })
        .then((data) => res.sendStatus(data !== 0 ? 204 : 404))
    console.log("✅ User supprimé");
}