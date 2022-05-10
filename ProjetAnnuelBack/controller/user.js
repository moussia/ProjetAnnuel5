import User from '../model/User.js';
import bcrypt from 'bcrypt';
import { sendRegistrationEmail } from '../utils/mail.js';

export const createUser = async (req, res) => {
    console.log('toto');
    // create and save new player in DB
    const { email, password, firstname, lastname, phone, role, birthday, address, city, country, zipcode } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = new User({
        email,
        password: hash,
        firstname,
        lastname,
        phone,
        role,
        birthday,
        address,
        city,
        country,
        zipcode
    });
    user.save();
    console.log('✅ Inscription');
    console.log(email);
    sendRegistrationEmail(email);
    res.send();
}

export const findUser = async (req) => {
    const { email } = req.body;
    return await User.findOne({ email });
}


export const currentUser = async (req, res) => {
    console.log(res.user);
    res.send(req.user);
}

export const updateUser = async (req, res) => {
    console.log('body', req.body);
    const updatedUser = await User.findOneAndUpdate({ _id: req.user._id }, req.body);
    res.send(updatedUser);
}




