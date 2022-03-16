import { Router } from 'express';
import { createUser, currentUser } from '../controller/user.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';

const userRouter = Router();

userRouter.post('/create', createUser);
userRouter.get('/current', isAuthenticated, currentUser);

export default userRouter;