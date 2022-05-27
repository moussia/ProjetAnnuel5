import User from '../model/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendToUserForgetPassword } from '../utils/mail.js';


export const Login = async (email, password, done) => {
    console.log(email, password)
    const user = await User.findOne({ email });
    if (!user) {
        return done(null, false);
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        return done(null, false);
    }
    console.log('✅ Connexion');
    return done(null, user)
}

export const Logout = async (req, res) => {
    if (req.user) {
        req.logOut();
    }
    console.log('✅ Deconnexion');
    res.send(200);
}

// Pour que l'utilisateur qui a oublié son mot de passe puisse le modifié.
export const SendEmailForForgePassword = async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user)
        return res.sendStatus(400);
    const link = jwt.sign({
        data: { _id: user._id }
    }, process.env.JWT_SECRET, { expiresIn: '1h' });
    sendToUserForgetPassword(email, `http://localhost:3000/newPassword?token=${link}`);
    res.send(200);
}

// Pour que l'utilisateur qui a oublié son mot de passe puisse le modifié.
export const resetPassword = async (req, res) => {
    try {
        const confirmation_password = req.body.confirmation_password;
        const token = req.body.token;
        const decodedjwt = jwt.verify(token, process.env.JWT_SECRET);
        const hash = await bcrypt.hash(confirmation_password, 10);
        await User.findOneAndUpdate({ _id: decodedjwt.data._id }, { password: hash }, {
            new: true
        });
        res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(401);
    }
}

