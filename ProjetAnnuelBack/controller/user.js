import User from '../model/User.js';
import bcrypt from 'bcrypt';
import { sendRegistrationEmail } from '../utils/mail.js';
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
    sendRegistrationEmail(email);
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

export const activatePro = async (req, res) => {
    const pro = req.params.proId;
    console.log(pro);
    const updatePro = await User.findOneAndUpdate({ _id: pro }, { activatedByAdmin: true }, {
        new: true
    });
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

export const getParent = async (req, res) => {
    const parents = await User.find({ role: roles.PARENT }, { password: 0 });
    res.send(parents);
}

export const getProFromId = async (req, res) => {
    try {
        const getPro = await User.findByPk({ _id: req.user._id });
        res.send(getPro.dataValues);
    } catch (err) {
        console.log(err);
    }
}
