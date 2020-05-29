import { fail } from 'assert';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import * as mocha from 'mocha';
import app from '../src/App';
import { getAdminToken } from './testHelpers';

chai.use(chaiHttp);
const expect = chai.expect;
const THISSHOULD404 = 'THISSHOULD404';
const ROUTEV1HEALTHTOKEN = '/healthtoken/';
const TENANT_ID = '-86';
const SERVICER_ID = '-86';

// tslint:disable:no-unused-expression no-console
describe(`GET ${ROUTEV1HEALTHTOKEN}`, () => {
    let token;

    before(async () => {
        try {
            token = await getAdminToken();
        } catch (err) {
            fail(`Error getting auth token: "${err.message}". Skipping test suite.`);
        }
    });

    it('returns ok status for authenticated request', (done) => {
        chai.request(app).get(ROUTEV1HEALTHTOKEN)
            .set('authorization', `Bearer ${token}`)
            .set('servicerid', SERVICER_ID)
            .set('tenantid', TENANT_ID)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body.data.message.length).to.be.greaterThan(0);
                done();
            });
    });

    it('returns unauthorized when bad token is used', (done) => {
        chai.request(app).get(ROUTEV1HEALTHTOKEN)
            .set('authorization', `Bearer BADTOKEN${token}`)
            .set('servicerid', SERVICER_ID)
            .set('tenantid', TENANT_ID)
            .end((err, res) => {
                expect(res.status).to.equal(401);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                done();
            });
    });

    it('returns not found when subresource is requested', (done) => {
        chai.request(app).get(ROUTEV1HEALTHTOKEN + THISSHOULD404)
            .set('authorization', `Bearer ${token}`)
            .set('servicerid', SERVICER_ID)
            .set('tenantid', TENANT_ID)
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                done();
            });
    });

    it('returns unauthorized when no token sent', (done) => {
        chai.request(app).get(ROUTEV1HEALTHTOKEN)
            .end((err, res) => {
                expect(res.status).to.equal(401);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                done();
            });
    });
});
