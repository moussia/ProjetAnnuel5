import { Router } from 'express';
import { activatePro, deletePro, getPro } from '../controller/pro.js';
import { getParentFromId, getParents, getProFromId } from '../controller/user.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { isAdmin } from '../middleware/Validators/isAdmin.js';

const router = Router();

router.get("/pro", isAuthenticated, isAdmin, getPro);
router.get("/parent", isAuthenticated, isAdmin, getParents);
router.get("/parent/:parentId", isAuthenticated, isAdmin, getParentFromId);
router.get("/pro/:proId", isAuthenticated, isAdmin, getProFromId);
// router.post("/", createParent);
router.put("/pro/:proId/activate", isAuthenticated, isAdmin, activatePro);
router.delete("/", deletePro);

export default router;