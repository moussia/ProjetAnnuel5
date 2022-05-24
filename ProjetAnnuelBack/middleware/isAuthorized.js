import { roles } from "../constants/Roles.js";

export const isParent = (req, res, next) => {
    if (req.user.role === roles.PARENT) return next();
    res.sendStatus(403);
}

export const isPro = (req, res, next) => {
    if (req.user.role === roles.PRO) return next();
    res.sendStatus(403);
}

export const isAdmin = (req, res, next) => {
    if (req.user.role === roles.ADMIN) return next();
    res.sendStatus(403);
}

