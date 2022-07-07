import User from '../model/User.js';
import bcrypt from 'bcrypt';
import { EnvoiMailAuProPourCompteValide, EnvoiMailAuProPourInscription, sendToAdminValidateComptePro } from '../utils/mail.js';
import { roles } from '../constants/Roles.js';
import jwt from 'jsonwebtoken';

export const createPro = async (req, res) => {
    console.log("createPro, route: /pro/create");
    try {
        // create and save new user pro in DB
        const { email, password, firstname, lastname, phone, sex, address, city, country, zipcode, job, description } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const user = new User({
            email,
            password: hash,
            firstname,
            lastname,
            phone,
            sex,
            address,
            city,
            country,
            zipcode,
            job,
            description,
            role: roles.PRO
        });
        await user.save();
        const link = jwt.sign({
            data: { _id: user._id }
        }, process.env.JWT_ACTIVATE, { expiresIn: '24h' });
        EnvoiMailAuProPourInscription(email, lastname, firstname, `${process.env.URL_FRONT}/activatedMail?token=${link}`); //mail pour validé l'inscription
        sendToAdminValidateComptePro(lastname, email); // mail à l'admin pour validé le compte pro
        res.sendStatus(200);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(400);
    }
}

export const activatePro = async (req, res) => {
    console.log("activatePro, route: /pro/:proId/activate");

    try {
        const pro = req.params.proId;
        console.log("pro : ", pro);
        const updatedPro = await User.findOneAndUpdate({ _id: pro }, { activatedByAdmin: true }, {
            new: true
        });
        EnvoiMailAuProPourCompteValide(updatedPro.email, req.user.lastname);
        res.send(updatedPro);
    } catch (error) {
        res.sendStatus(400);
    }

}

export const updatePro = async (req, res) => {
    console.log("updatePro, route: /pro/:proId");

    try {
        const updatePro = await User.findOneAndUpdate({ _id: req.user._id }, req.body, {
            new: true
        });
        res.send(updatePro);
    } catch (error) {
        res.sendStatus(400);
    }

}

export const getPro = async (req, res) => {
    console.log("getPro, route: /pro");

    try {
        const pro = await User.find({ role: roles.PRO }, { password: 0 }).sort({ createdAt: 'desc' });
        res.send(pro);
    } catch (error) {
        res.sendStatus(400);
    }

}

export const deletePro = async (req, res) => {
    console.log("deletePro, route: /pro/dispo/update");

    try {
        User.deleteOne({ _id: req.params.proId })
            .then((data) => res.sendStatus(data !== 0 ? 204 : 404))
        console.log("✅ User supprimé");
    } catch (error) {
        res.sendStatus(400);
    }
}