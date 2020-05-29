import * as chai from 'chai';
import chaiHttp = require('chai-http');
import * as mocha from 'mocha';
import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;
const THISSHOULD404 = 'THISSHOULD404';
const ROUTEV1HELLO = '/health/';

// tslint:disable:no-unused-expression
describe(`GET ${ROUTEV1HELLO}`, () => {
    it('returns ok status with message', (done) => {
        chai.request(app).get(ROUTEV1HELLO)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body.data.message).to.equal('Server Up');
                done();
            });
    });

    it('returns unauthorized when subresource is requested', (done) => {
        chai.request(app).get(ROUTEV1HELLO + THISSHOULD404)
            .end((err, res) => {
                expect(res.status).to.equal(401);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                done();
            });
    });
});
