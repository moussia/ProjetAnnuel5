import User from '../model/User.js';
import bcrypt from 'bcrypt';
import { EnvoiMailAuParentPourInscription } from '../utils/mail.js';
import { roles } from '../constants/Roles.js';
import jwt from 'jsonwebtoken';

export const createParent = async (req, res) => {
    try {
        // create and save new player in DB
        const { email, password, firstname, lastname, phone, birthday, address, city, country, zipcode } = req.body;
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
            activatedByAdmin: true,
            role: roles.PARENT
        });
        await user.save();
        console.log('✅ Inscription Client');
        // sellerRegisterEmail(req.body.email, req.body.name, req.body.email);
        const link = jwt.sign({
            data: { _id: user._id }
        }, process.env.JWT_ACTIVATE, { expiresIn: '24h' });
        EnvoiMailAuParentPourInscription(email, lastname, `${process.env.URL_FRONT}/activatedMail?token=${link}`);
        // comme mot de passe oublié, genere un token jwt que jenvoie par email et je change le template pour le mail
        res.sendStatus(200);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(400);
    }

}

export const findUser = async (req) => {
    const { email } = req.body;
    return await User.findOne({ email });
}

export const currentUser = async (req, res) => {
    // console.log(res.user);
    res.send(req.user);
}

export const updateUser = async (req, res) => {
    // console.log('body', req.body);
    const updatedUser = await User.findOneAndUpdate({ _id: req.user._id }, req.body);
    res.send(updatedUser);
}

export const getParents = async (req, res) => {
    const parents = await User.find({ role: roles.PARENT }, { password: 0 });
    res.send(parents);
}

export const getProFromId = async (req, res) => {
    try {
        const getPro = await User.findById({ _id: req.params.proId });
        res.send(getPro);
    } catch (err) {
        console.log(err);
    }
}

export const getParentFromId = async (req, res) => {
    try {
        const getParent = await User.findById({ _id: req.params.parentId });
        res.send(getParent);
    } catch (err) {
        console.log(err);
    }
}

export const deleteParent = async (req, res) => {
    User.deleteOne({ _id: req.params.parentId })
        .then((data) => res.sendStatus(data !== 0 ? 204 : 404))
    console.log("✅ User supprimé");
}

// Enregistrement du nouveau mot de passe lorsqu'on a oublié son mot de passe
export const NewPasswordForget = async (req, res) => {
    // console.log('body', req.body);
    const updatedUser = await User.findOneAndUpdate({ _id: req.user._id }, req.body);
    res.send(updatedUser);
}
