import { Router } from 'express';
import { createDisponibilite, getDisponibilite } from '../controller/disponibilite.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { isPro } from '../middleware/isAuthorized.js';

const proRouter = Router();

proRouter.post('/dispo/update', isAuthenticated, isPro, createDisponibilite)
proRouter.get('/dispo', isAuthenticated, isPro, getDisponibilite)


export default proRouter;