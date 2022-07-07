export const isAuthenticated = (req, res, next) => {
    console.log("isAuthenticated, -> server");

    if (req.isAuthenticated()) return next();
    res.sendStatus(401);
    console.log('Unauthorized');
}