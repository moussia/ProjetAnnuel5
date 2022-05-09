import { Router } from 'express';
import { createUser, currentUser, updateUser } from '../controller/user.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { ValidateSignup } from '../middleware/Validators/SignUp.js';

const userRouter = Router();

userRouter.post('/create', ValidateSignup, createUser);
userRouter.get('/current', isAuthenticated, currentUser);
userRouter.put('/update', isAuthenticated, updateUser);


export default userRouter;