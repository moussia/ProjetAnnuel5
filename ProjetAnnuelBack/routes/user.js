import { Router } from 'express';
import { closeChat, isChatExist } from '../controller/chat.js';
import { activatedMail, modifPassword, resetPassword, SendEmailForForgePassword } from '../controller/login.js';
// import { ModifPasswordForget, SendEmailForForgePassword } from '../controller/login.js';
import { createPro } from '../controller/pro.js';
import { closeReservation, createDemandeReservation, historiqueForParent } from '../controller/reservation.js';
import { createParent, currentUser, updateUser } from '../controller/user.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { isParent } from '../middleware/isAuthorized.js';
import { ValidateParentSignup } from '../middleware/Validators/SignUp.js';
import { ValidateProSignup } from '../middleware/Validators/SignUpPro.js';
// import { isAdmin } from "../middlewares/isAdmin.js";

const userRouter = Router();

userRouter.post('/create', ValidateParentSignup, createParent);
userRouter.post('/pro/create', ValidateProSignup, createPro);
userRouter.get('/current', isAuthenticated, currentUser);
userRouter.get('/services', isAuthenticated, isParent);
userRouter.put('/update', isAuthenticated, updateUser);
userRouter.post('/forgetPassword', SendEmailForForgePassword);
userRouter.post('/modifPassword', isAuthenticated, modifPassword);
userRouter.post('/resetPassword', resetPassword);
userRouter.post('/activatedMail', activatedMail);
userRouter.post('/sendReservation', isAuthenticated, createDemandeReservation);
userRouter.put('/closeChat', isAuthenticated, closeChat);
userRouter.get('/isChatExist/:reservationId', isAuthenticated, isChatExist);
userRouter.put('/closeReservation', isAuthenticated, closeReservation);
userRouter.get("/historique", isAuthenticated, isParent, historiqueForParent);


export default userRouter;