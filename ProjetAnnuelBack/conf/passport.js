import LocalStrategy from 'passport-local';
import { Login } from '../controller/login.js';
import User from '../model/User.js';

export const passportInit = (passport) => {
    // Define strategy to apply 
    passport.use(
        new LocalStrategy(
            { usernameField: 'email', passwordField: 'password' },
            Login
        )
    );
    console.log('✅ Passport loaded.');

    // Specify which data should be store in session 
    passport.serializeUser((user, done) =>
        done(null, user._id)
    );

    // Invoked on every request and enable to reload user data 
    passport.deserializeUser(async (_id, done) => {
        const user = await User.findById(_id, { password: 0 });
        done(null, user);
    });
};