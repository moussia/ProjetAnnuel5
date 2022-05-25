import { Router } from 'express';
import { createPro } from '../controller/pro.js';
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


export default userRouter;