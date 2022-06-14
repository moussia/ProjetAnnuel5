import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import { createServer } from "http";
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
const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Quand_on_sera_en_https 
        maxAge: 30 * 24 * 60 * 60 * 1000, // la session va durer 30 jours
        // sameSite: 'none',
    }
});

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', userRouter);
app.use('/session', authRouter);
app.use('/admin', adminRouter);
app.use('/pro', proRouter);

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        credentials: true,
        origin: process.env.URL_FRONT
    },
});

// convert a connect middleware to a Socket.IO middleware
// const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);



// io.use(wrap(sessionMiddleware));
// io.use(wrap(passport.initialize()));
// io.use(wrap(passport.session()));


// io.use((socket, next) => {
//     console.log('***************************** socket.request.session.user', socket.request.session.user);
//     console.log('***************************** socket.request.user', socket.request.user);
//     if (socket.request.session.user) {
//         next();
//     } else {
//         next(new Error('unauthorized'))
//     }
// });

io.on('connect', (socket) => {
    console.log(`new connection ${socket.id}`);

    socket.on("join_room", (room) => {
        console.log(socket.id + ' joined ' + room)
        socket.join(room);
    });

    socket.on("send_message", (data) => {
        console.log('->', data);
        socket.broadcast.to(data.room).emit("receive_message", data.msg);
    });
});


httpServer.listen(process.env.PORT, () => {
    console.log(`✅ App listening on port ${process.env.PORT}`)
})