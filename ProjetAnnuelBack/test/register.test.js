process.env.NODE_ENV = 'test';

import { App } from '../app';
import chai from 'chai';
import chaiHttp from 'chai-http';
import {
    createCompany,
    createUser,
    email,
    loginUser,
    createAdmin,
    email2
} from './Values/users';
import { UserModel } from '../Models/User';
import { Strings } from '../Config/constants/strings';

chai.should();
chai.use(chaiHttp);

let cookie: string;
let companyId: string;
let userId: string;

describe('\n\nPOST /users', () => {
    before((done) => {
        chai
            .request(App)
            .post('/api/users')
            .send(createAdmin)
            .end(() => setTimeout(() => done(), 500));
    });
    before((done) => {
        chai
            .request(App)
            .post('/api/session')
            .send(loginUser)
            .end((_err: Error, res) => {
                cookie = res.header['set-cookie'][0].split(';')[0];
                done();
            });
    });
    before((done) => {
        chai
            .request(App)
            .post('/api/companies')
            .set('Cookie', cookie)
            .send(createCompany)
            .end((_err: Error, res) => {
                companyId = res.body.companyId;
                done();
            });
    });
    after(() => UserModel.deleteOne({ email }));
    after(() => UserModel.deleteOne({ email: email2 }));

    it('Create user (good request) : Should return 201', (done) => {
        chai
            .request(App)
            .post(`/api/companies/${companyId}/users`)
            .set('Cookie', cookie)
            .send(createUser)
            .end((_err: Error, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql(Strings.SIGNUP);
                done();
            });
    });

    it('Create user (unauthenticated) : Should return 401', (done) => {
        chai
            .request(App)
            .post(`/api/companies/${companyId}/users`)
            .send(createUser)
            .end((_err: Error, res) => {
                res.should.have.status(401);
                done();
            });
    });

    it('Create user (bad companyId) : Should return 400', (done) => {
        chai
            .request(App)
            .post(`/api/companies/undefined/users`)
            .set('Cookie', cookie)
            .send(createUser)
            .end((_err: Error, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Get users (good request) : Should return 200', (done) => {
        chai
            .request(App)
            .get(`/api/companies/${companyId}/users/`)
            .set('Cookie', cookie)
            .send()
            .end((_err: Error, res) => {
                userId = res.body;
                res.should.have.status(200);
                userId = res.body[0]._id;
                done();
            });
    });

    it('Update user (good request) : Should return 200', (done) => {
        chai
            .request(App)
            .put(`/api/companies/${companyId}/users/${userId}`)
            .set('Cookie', cookie)
            .send(createUser)
            .end((_err: Error, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('Update user (unauthenticated) : Should return 401', (done) => {
        chai
            .request(App)
            .put(`/api/companies/${companyId}/users/${userId}`)
            .send(createUser)
            .end((_err: Error, res) => {
                res.should.have.status(401);
                done();
            });
    });

    it('Update user (bad userId) : Should return 400', (done) => {
        chai
            .request(App)
            .put(`/api/companies/undefined/users/${userId}`)
            .set('Cookie', cookie)
            .send(createUser)
            .end((_err: Error, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Update user (bad companyId) : Should return 400', (done) => {
        chai
            .request(App)
            .put(`/api/companies/${companyId}/users/undefined`)
            .set('Cookie', cookie)
            .send(createUser)
            .end((_err: Error, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Delete user (good request) : Should return 200', (done) => {
        chai
            .request(App)
            .delete(`/api/companies/${companyId}/users/${userId}`)
            .set('Cookie', cookie)
            .send()
            .end((_err: Error, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('Delete user (unauthenticated) : Should return 401', (done) => {
        chai
            .request(App)
            .delete(`/api/companies/${companyId}/users/${userId}`)
            .send()
            .end((_err: Error, res) => {
                res.should.have.status(401);
                done();
            });
    });

    it('Delete user (bad companyId) : Should return 400', (done) => {
        chai
            .request(App)
            .delete(`/api/companies/undefined/users/${userId}`)
            .set('Cookie', cookie)
            .send()
            .end((_err: Error, res) => {
                res.should.have.status(400);
                done();
            });
    });

    it('Delete user (bad userId) : Should return 400', (done) => {
        chai
            .request(App)
            .delete(`/api/companies/${companyId}/users/undefined`)
            .set('Cookie', cookie)
            .send()
            .end((_err: Error, res) => {
                res.should.have.status(400);
                done();
            });
    });
});