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
