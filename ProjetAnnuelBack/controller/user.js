import User from '../model/User.js';
import bcrypt from 'bcrypt';
import { EnvoiMailAuParentPourInscription } from '../utils/mail.js';
import { roles } from '../constants/Roles.js';

export const createParent = async (req, res) => {
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
        role: roles.PARENT
    });
    user.save();
    console.log('✅ Inscription Client');
    // sellerRegisterEmail(req.body.email, req.body.name, req.body.email);
    EnvoiMailAuParentPourInscription(email, lastname, email);
    res.send();
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