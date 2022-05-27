import User from '../model/User.js';
import bcrypt from 'bcrypt';

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
    res.send(200);
}

// Pour que l'utilisateur qui a oublié son mot de passe puisse le modifié.
export const ModifPasswordForget = async (req, res) => {
    const updatePasswordForget = await User.findOneAndUpdate({ _id: req.user._id }, req.body, {
        new: true
    });
    res.send(updatePasswordForget);
}

