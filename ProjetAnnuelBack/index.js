import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import http from "http";
import { Server } from "socket.io";
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

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });
});

server.listen(process.env.PORT, () => {
    console.log(`✅ App listening on port ${process.env.PORT}`)
})