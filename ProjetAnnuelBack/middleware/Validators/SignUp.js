export const ValidateSignup = [
    body('email')
        .exists()
        .withMessage(Strings.VALIDATE_EMAIL_NEEDED)
        .notEmpty()
        .withMessage(Strings.VALIDATE_EMPTY_MAIL)
        .trim()
        .escape()
        .normalizeEmail()
        .isEmail()
        .withMessage(Strings.VALIDATE_INVALID_MAIL),
    body('password')
        .exists()
        .withMessage(Strings.VALIDATE_PASSWORD_NEEDED)
        .isStrongPassword({
            minLength: 8,
            minNumbers: 1,
            minSymbols: 1,
            minLowercase: 1,
            minUppercase: 1
        })
        .withMessage(Strings.VALIDATE_WEAK_PASSWORD),
    body('firstname')
        .exists()
        .withMessage(Strings.VALIDATE_FIRSTNAME_NEEDED)
        .notEmpty()
        .withMessage(Strings.VALIDATE_EMPTY_FIRSTNAME)
        .trim()
        .escape(),
    body('lastname')
        .exists()
        .withMessage(Strings.VALIDATE_LASTNAME_NEEDED)
        .notEmpty()
        .withMessage(Strings.VALIDATE_EMPTY_LASTNAME)
        .trim()
        .escape(),
    (req, res, next) => {
        try {
            myValidationResult(req).throw();
            const { email, password1, lastname, firstname } = req.body;

            req.body = {
                email,
                password1,
                lastname,
                firstname
            };
            next();
        } catch (err) {
            Logger.warn(err.mapped());
            res.status(400).json({ message: Strings.INVALID_CREDS }).send();
        }
    }
];