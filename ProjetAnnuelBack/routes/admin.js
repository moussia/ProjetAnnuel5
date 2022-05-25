import { Router } from 'express';
import { activatePro, deletePro, getPro, updatePro } from '../controller/pro.js';
import { deleteParent, getParentFromId, getParents, getProFromId } from '../controller/user.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { isAdmin } from '../middleware/Validators/isAdmin.js';

const router = Router();

router.get("/pro", isAuthenticated, isAdmin, getPro);
router.get("/parent", isAuthenticated, isAdmin, getParents);
router.get("/parent/:parentId", isAuthenticated, isAdmin, getParentFromId);
router.get("/pro/:proId", isAuthenticated, isAdmin, getProFromId);
// router.post("/", createParent);
router.put("/pro/:proId/activate", isAuthenticated, isAdmin, activatePro);
router.put("/pro/:proId", isAuthenticated, isAdmin, updatePro);
router.delete("/pro/:proId", deletePro);
router.delete("/parent/:parentId", deleteParent);

export default router;