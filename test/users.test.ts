import * as chai from 'chai';
import chaiHttp = require('chai-http');
import * as mocha from 'mocha';
import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;
const THISSHOULD404 = 'THISSHOULD404';
const USERS = '/users/';

// tslint:disable:no-unused-expression
describe(`GET ${USERS}`, () => {
    it('returns ok status with a collection of users', (done) => {
        chai.request(app).get(USERS)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                done();
            });
    });

    it('returns unauthorized when subresource is requested', (done) => {
        chai.request(app).get(USERS + THISSHOULD404)
            .end((err, res) => {
                expect(res.status).to.equal(401);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                done();
            });
    });

    // TODO: implement a test for one of the other router endpoints.
});
