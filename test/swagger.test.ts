import * as chai from 'chai';
import chaiHttp = require('chai-http');
import * as mocha from 'mocha';
import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;
const ROUTEV1DOCS = '/docs/';

// tslint:disable:no-unused-expression
describe('Get documentation', () => {
    it('UI is accessible without authorization', (done) => {
        chai.request(app).get(ROUTEV1DOCS)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res).to.be.html;
                done();
            });
    });

    it('json is accessible without authorization', (done) => {
        chai.request(app).get(`${ROUTEV1DOCS}json`)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res.body).to.have.property('swagger', '2.0');
                done();
            });
    });
});
