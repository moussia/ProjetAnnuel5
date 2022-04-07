import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';
import './conf/database.js';
import passport from 'passport';
import { passportInit } from './conf/passport.js';
import cors from 'cors';


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

// configure express session 
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false, //Quand on sera en https 
            maxAge: 30 * 24 * 60 * 60 * 1000 //la session va durer 30 jours
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/user', userRouter);
app.use('/session', authRouter);

app.listen(process.env.PORT, () => {
    console.log(`✅ App listening on port ${process.env.PORT}`)
})