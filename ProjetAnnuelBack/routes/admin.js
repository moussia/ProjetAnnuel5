import { Router } from 'express';
import { activatePro, getParent, getPro, getProFromId } from '../controller/user.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { isAdmin } from '../middleware/Validators/isAdmin.js';

const router = Router();

router.get("/pro", isAuthenticated, isAdmin, getPro);
router.get("/parent", isAuthenticated, isAdmin, getParent);
router.get("/pro/:getId", isAuthenticated, isAdmin, getProFromId);
// router.post("/", createParent);
router.put("/pro/:proId/activate", isAuthenticated, isAdmin, activatePro);

export default router;