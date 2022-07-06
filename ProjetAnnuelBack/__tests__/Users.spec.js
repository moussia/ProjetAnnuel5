process.env.NODE_ENV = 'test';

import request from "supertest";
import { app } from '../server';
import db from "./db";

const user = {
    lastname: "antunes",
    firstname: "samuel",
    email: "samuelantunes@gmail.com",
    activatedByAdmin: true,
    password: "$2b$10$dKNZv2CENGP5sHXwpzOpyOuZuQiZOK5xYL2mpDT / 3sWoixJKCyU7q",
    phone: "0614243678",
    role: "PARENT",
    address: "49 rue petit",
    city: "paris",
    zipcode: "75019",
    sex: "MAN",
    isDisponible: false,
}

const admin = {
    lastname: "admin",
    firstname: "admin",
    email: "sosparentsoff@gmail.com",
    password: "$2b$10$8yTSM9UmQDxlqq6XdlBqIOiO6BsquWuRiOHQHwjxqpvvPFrcLz3m6",
    phone: "0783185678",
    role: "ADMIN",
    job: "educatrice",
    description: "je suis l&#x27;admin.",
    address: "8 allée de la garance",
    city: "paris",
    zipcode: "75019",
    sex: "MAN",
    isDisponible: false,
}

const pro = {
    lastname: "kejler",
    firstname: "jeremy",
    email: "kejlerj@gmail.com",
    password: "$2b$10$Jn6tBEJyTq9sh7HxHFnK2uijw2EtWE/o7B0ykD9Df8DWCY0y1OqR.",
    phone: "0606060606",
    role: "PRO",
    job: "educatrice",
    description: "Je suis présent pour vous aidez",
    address: "13 rue de turgo",
    city: "Paris",
    zipcode: "75009",
    sex: "MAN",
    isDisponible: false,
}


// Send 200 - Login validé
const validLogin = [
    { email: 'samuelantunes@gmail.com', password: 'Hayamottal555//' }, // Test User
    { email: 'sosparentsoff@gmail.com', password: 'Hayamottal555/' }, // Test Pro
    { email: 'kejlerj@gmail.com', password: 'Hayamottal555/' }, // Test Admin
];

// Send 400 - Mauvais format
const invalidFormatLogin = [
    { email: 'moussiamottal@gmail.com' }, // Test invalide, Mot de passe inexistant
    { password: '' }, // Test invalide, Email inexistant et Mot de passe vide
    { email: 'admin@gmail.com', password: '' }, // Test Admin, Mot de passe vide
    { email: '', password: 'dedddfvr' }, // Test Admin, Email inexistant et Mot de passe Invalide
    { email: 'admingmail.com', password: 'ertrt' }, // Test Admin, Email mauvais format et mauvais Mot de passe
    { email: 'admin@gmail.com', password: 'aaa' }, // Test Admin, mauvais Mot de passe
];

// Send 401 - Mauvais identifiants
const badLogin = [
    { email: 'moussiamottal@gmail.com', password: 'oiefheoiej' }, // Mauvais mot de passe  
    { email: 'toto@gmail.com', password: 'oiefheoiej' }, // Mauvais Email et Mauvais mot de passe
]

describe('Users routes', () => {
    beforeAll(async () => {
        await db.connect();
    });
    beforeEach(async () => {
        await request(app).post('/user/create').send(user);
        await request(app).post('user/pro/create').send(pro);
    });
    afterEach(async () => await db.clear());
    afterAll(async () => await db.close());

    validLogin.forEach((data, i) => {
        test(`valid logins ${i}`, async () => {
            const res = await request(app).post('/session').send(data);
            expect(res.statusCode).toEqual(200);
        })
    });

    invalidFormatLogin.forEach((data, i) => {
        test(`invalid logins ${i}`, async () => {
            const res = await request(app).post('/session').send(data);
            expect(res.statusCode).toEqual(400);
        })
    });

    badLogin.forEach((data, i) => {
        test(`bad logins ${i}`, async () => {
            const res = await request(app).post('/session').send(data);
            expect(res.statusCode).toEqual(401);
        })
    })
});