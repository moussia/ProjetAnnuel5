import nodemailer from 'nodemailer';
import { promisify } from 'util';
import handlebars from 'handlebars';
import fs from 'fs';

// require('dotenv').config();

const readFile = promisify(fs.readFile);

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

// export const sendRegistrationEmail = (email) => {
//     const mailOptions = {
//         // from: process.env.EMAIL_USERNAME,
//         from: `"SOS Parents" < ${process.env.EMAIL_USERNAME}> `, // sender address

//         to: email,
//         subject: 'Inscription',
//         text: 'Votre inscription a été prise en compte, merci de nous faire confiance !'
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('Email sent: ' + info.response);
//         }
//     });
// };



export const sendRegistrationEmail = async (to, name, email) => {
    let source = await readFile('../template/Email-register.html', 'utf8');
    let template = handlebars.compile(source);
    const data = {
        name, email
    }
    let html = template(data);

    const mailOptions = {
        from: `"MochiPay" <${process.env.EMAIL_USERNAME}>`, // sender address
        to, // list of receivers
        subject: "Register", // Subject line
        text: "Hello world?", // plain text body
        html, // html body
    }

    // send mail with defined transport object
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.log('Email cannot be send: ' + error);
        else {
            console.log('Email sent: ' + clientInformation.response);
            return true;
        }
    });
}


// let transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true, // true for 465, false for other ports
//     auth: {
//         user: process.env.EMAIL, // generated ethereal user
//         pass: process.env.PASS, // generated ethereal password
//     },
// });

// const sellerRegisterEmail = async (to, name, email) => {
//     let source = await readFile('template/Email-register.html', 'utf8');
//     let template = handlebars.compile(source);
//     const data = {
//         name, email
//     }
//     let html = template(data);

//     const mailOptions = {
//         from: `"MochiPay" < ${ process.env.EMAIL }> `, // sender address
//         to, // list of receivers
//         subject: "Register", // Subject line
//         text: "Hello world?", // plain text body
//         html, // html body
//     }

//     // send mail with defined transport object
//     await transporter.sendMail(mailOptions, (error, info) => {
//         if (error) console.log('Email cannot be send: ' + error);
//         else {
//             console.log('Email sent: ' + clientInformation.response);
//             return true;
//         }
//     });
// }
