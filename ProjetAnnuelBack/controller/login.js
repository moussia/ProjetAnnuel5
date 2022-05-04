import User from '../model/User.js';
import bcrypt from 'bcrypt';

export const Login = async (email, password, done) => {
    console.log(email, password)
    const user = await User.findOne({ email });
    if (!user) {
        return done(null, false);
        console.log('❌ Le login n existe pas');
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


