export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.sendStatus(403);
}