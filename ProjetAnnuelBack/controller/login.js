import User from '../model/User.js';
import bcrypt from 'bcrypt';

export const Login = async (email, password, done) => {
    const user = await User.findOne({ email });
    if (!user) {
        return done(null, false);
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        return done(null, false);
    }
    return done(null, user)
}

export const Logout = async (req, res) => {
    if (req.user) {
        req.logOut();
    }
    res.send(200);
}
