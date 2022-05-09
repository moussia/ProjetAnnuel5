import { body, validationResult } from 'express-validator';
import { strings } from '../../constants/Strings.js';

export const ValidateSignup = [
    body('email')
        .exists()
        .withMessage(strings.VALIDATE_EMAIL_NEEDED)
        .notEmpty()
        .withMessage(strings.VALIDATE_EMPTY_MAIL)
        .trim()
        .escape()
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
        .isNumeric()
        .escape(),
    body('phone')
        .exists()
        .withMessage(strings.VALIDATE_PHONE_NEEDED)
        .notEmpty()
        .withMessage(strings.VALIDATE_EMPTY_PHONE)
        .trim()
        .escape(),
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
        .escape(),
    body('sex')
        .exists()
        .withMessage(strings.VALIDATE_SEX_NEEDED)
        .notEmpty()
        .withMessage(strings.VALIDATE_EMPTY_SEX)
        .trim()
        .escape(),
    (req, res, next) => {
        try {
            myValidationResult(req).throw();
            const { email, password, lastname, firstname, address, city, zipcode, phone, sex } = req.body;

            req.body = {
                email,
                password,
                lastname,
                firstname,
                address,
                city,
                zipcode,
                phone,
                sex
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