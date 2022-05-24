import { roles } from '../../constants/Roles.js';

export const isAdmin = (req, res, next) => {
    if (req.user.role === roles.ADMIN) return next();
    res.sendStatus(403);
}