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

io.on('connect', (socket) => {
    console.log(`new connection ${socket.id}`);

    socket.on("join_room", (room) => {
        console.log(socket.id + ' joined ' + room)
        socket.join(room);
    });

    socket.on("leave_room", (room) => {
        console.log(socket.id + ' leaved ' + room);
        socket.leave(room);
        socket.in(room).emit("closed", true);
    });

    socket.on("match", (room) => {
        console.log('match', socket.id, ' -> ', room);
        socket.broadcast.to(room).emit("receive_match", true);
    });

    socket.on("send_message", (data) => {
        console.log('send_message', socket.id, '->', data);
        socket.broadcast.to(data.room).emit("receive_message", data.msg);
    });
});


httpServer.listen(process.env.PORT, () => {
    console.log(`✅ App listening on port ${process.env.PORT}`)
})