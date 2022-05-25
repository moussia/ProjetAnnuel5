import User from '../model/User.js';
import bcrypt from 'bcrypt';
import { sendRegistrationEmail } from '../utils/mail.js';
import { roles } from '../constants/Roles.js';

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
    sendRegistrationEmail(email);
    res.send();
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

export const deletePro = async (req, res) => {
    User.destroy({ where: { _id: req.user._id } })
        .then((data) => res.sendStatus(data !== 0 ? 204 : 404))
    // .catch((e) => res.sendStatus(500));
    console.log("✅ User supprimé");
}