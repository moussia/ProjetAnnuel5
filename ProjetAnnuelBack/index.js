import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';
import adminRouter from './routes/admin.js';
import './conf/database.js';
import passport from 'passport';
import { passportInit } from './conf/passport.js';
import cors from 'cors';
import proRouter from './routes/pro.js';


const app = express();
app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
        limit: '30mb'
    })
);

app.use(
    cors({
        credentials: true,
        origin: [process.env.URL_FRONT]
    })
);

passportInit(passport);

//configure_express_session 
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false, // Quand_on_sera_en_https 
            maxAge: 30 * 24 * 60 * 60 * 1000, // la session va durer 30 jours
            // sameSite: 'none',
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/user', userRouter);
app.use('/session', authRouter);
app.use('/admin', adminRouter);
app.use('/pro', proRouter);

app.listen(process.env.PORT, () => {
    console.log(`✅ App listening on port ${process.env.PORT}`)
})