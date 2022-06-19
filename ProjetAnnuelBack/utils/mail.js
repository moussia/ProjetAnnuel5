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

export const EnvoiMailAuParentPourInscription = async (to, lastname, link) => {
    let source = await readFile('template/Email-register.html', 'utf8');
    let template = handlebars.compile(source);
    const data = {
        lastname, link
    }
    let html = template(data);

    const mailOptions = {
        from: `"SOS Parents" <${process.env.EMAIL_USERNAME}>`, // sender address
        to, // list of receivers
        subject: "Inscription", // Subject line
        text: "Merci de votre inscription", // plain text body
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

export const EnvoiMailAuProPourInscription = async (to, lastname, link) => {
    let source = await readFile('template/EmailProRegister.html', 'utf8');
    let template = handlebars.compile(source);
    const data = {
        lastname, link
    }
    let html = template(data);

    const mailOptions = {
        from: `"SOS Parents" <${process.env.EMAIL_USERNAME}>`, // sender address
        to, // list of receivers
        subject: "Inscription", // Subject line
        text: "Merci de votre inscription", // plain text body
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


export const EnvoiMailAuProPourCompteValide = async (to, lastname, email) => {
    let source = await readFile('template/EmailCompteValide.html', 'utf8');
    let template = handlebars.compile(source);
    const data = {
        lastname, email
    }
    let html = template(data);

    const mailOptions = {
        from: `"SOS Parents" <${process.env.EMAIL_USERNAME}>`, // sender address
        to, // list of receivers
        subject: "Validation Compte", // Subject line
        text: "Votre compte à été validé par un administrateur", // plain text body
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



export const sendToAdminValidateComptePro = async (lastname, email) => {
    let source = await readFile('template/EmailAdminNewInscriptionPro.html', 'utf8');
    let template = handlebars.compile(source);
    const data = {
        lastname, email
    }
    let html = template(data);

    const mailOptions = {
        from: `"SOS Parents" <${process.env.EMAIL_USERNAME}>`, // sender address
        to: `"SOS Parents" <${process.env.EMAIL_USERNAME}>`,
        subject: "Inscription Pro", // Subject line
        text: "Activer le compte du nouveau professionnel qui vens de s'inscrire au site.", // plain text body
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

//Envoie email lorsque l'utilisateur oublie son mot de passe
export const sendToUserForgetPassword = async (to, link) => {
    let source = await readFile('template/EmailForgetPassword.html', 'utf8');
    let template = handlebars.compile(source);
    const data = {
        link
    }
    let html = template(data);

    const mailOptions = {
        from: `"SOS Parents" <${process.env.EMAIL_USERNAME}>`, // sender address
        to,
        subject: "Mot de passe oublié", // Subject line
        text: "Vous avez oubliez votre mot de passe.", // plain text body
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
    console.log("✅ EMAIL ENVOYE");
}



//Envoie email a un pro lorsque qu'un parent fait une demande d'aide
export const sendToProForDemandeAide = async (to) => {
    let source = await readFile('template/Email-demandeAide.html', 'utf8');
    let template = handlebars.compile(source);
    // const data = {
    //     link
    // }
    let html = template();

    console.log(to);

    const mailOptions = {
        from: `"SOS Parents" <${process.env.EMAIL_USERNAME}>`, // sender address
        to,
        subject: "Aidez un parent", // Subject line
        text: "Un parent vous demande de l'aide.", // plain text body
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
    console.log("✅ EMAIL ENVOYE à : ", to);
}


// export const sendToAdminValidateComptePro = async (to, lastname, email) => {

// }
