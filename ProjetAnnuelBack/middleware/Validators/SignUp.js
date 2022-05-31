import { body, validationResult } from 'express-validator';
import { strings } from '../../constants/Strings.js';
import { roles } from '../../constants/Roles.js';

export const ValidateParentSignup = [
    body('email')
        .exists()
        .withMessage(strings.VALIDATE_EMAIL_NEEDED)
        .notEmpty()
        .withMessage(strings.VALIDATE_EMPTY_MAIL)
        .trim() //retirer les espaces a gauche et a droite
        .escape() //pour ne pas qu'il y ai des caracteres bizare
        .normalizeEmail()
        .isEmail()
        .withMessage(strings.VALIDATE_INVALID_MAIL),
    body('password')
        .exists()
        .withMessage(strings.VALIDATE_PASSWORD_NEEDED)
        .isStrongPassword({
            minLength: 8,
            minNumbers: 1,
            minSymbols: 1,
            minLowercase: 1,
            minUppercase: 1
        })
        .withMessage(strings.VALIDATE_WEAK_PASSWORD),
    body('firstname')
        .exists()
        .withMessage(strings.VALIDATE_FIRSTNAME_NEEDED)
        .notEmpty()
        .withMessage(strings.VALIDATE_EMPTY_FIRSTNAME)
        .trim()
        .escape(),
    body('lastname')
        .exists()
        .withMessage(strings.VALIDATE_LASTNAME_NEEDED)
        .notEmpty()
        .withMessage(strings.VALIDATE_EMPTY_LASTNAME)
        .trim()
        .escape(),
    body('phone')
        .exists()
        .withMessage(strings.VALIDATE_PHONE_NEEDED)
        .notEmpty()
        .withMessage(strings.VALIDATE_EMPTY_PHONE)
        .trim()
        .escape()
        .isMobilePhone()
        .withMessage(strings.VALIDATE_ERROR_PHONE),
    body('address')
        .exists()
        .withMessage(strings.VALIDATE_ADDRESS_NEEDED)
        .notEmpty()
        .withMessage(strings.VALIDATE_EMPTY_ADDRESS)
        .trim()
        .escape(),
    body('city')
        .exists()
        .withMessage(strings.VALIDATE_CITY_NEEDED)
        .notEmpty()
        .withMessage(strings.VALIDATE_EMPTY_CITY)
        .trim()
        .escape(),
    body('zipcode')
        .exists()
        .withMessage(strings.VALIDATE_ZIPCODE_NEEDED)
        .notEmpty()
        .withMessage(strings.VALIDATE_EMPTY_ZIPCODE)
        .trim()
        .escape()
        .isPostalCode('FR')
        .withMessage(strings.VALIDATE_ERROR_ZIPCODE),
    body('sex')
        .exists()
        .withMessage(strings.VALIDATE_SEX_NEEDED)
        .notEmpty()
        .withMessage(strings.VALIDATE_EMPTY_SEX)
        .trim()
        .escape(),
    body('role')
        .trim()
        .isIn([roles.USER])
        .escape(),
    (req, res, next) => {
        try {
            myValidationResult(req).throw();
            const { email, password, lastname, firstname, address, city, zipcode, phone, sex, role } = req.body;
            req.body = {
                email,
                password,
                lastname,
                firstname,
                address,
                city,
                zipcode,
                phone,
                sex,
                role
            };
            next();
        } catch (err) {
            res.status(400).json({ message: err.mapped() }).send();
        }
    }
];

const myValidationResult = validationResult.withDefaults({
    formatter: (error) => ({
        msg: error.msg
    })
});