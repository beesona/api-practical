import { expect } from 'chai';
import * as mocha from 'mocha';
import { XXX } from '../src/types/model/XXX';
import { ValidationGroup } from '../src/types/validation';

describe('XXX model validation', () => {
    it('validates nested properties', async () => {
        const model = new XXX({
            zzzs: [{
                name: 'test1',
                type: 'abc'
            }, {
                name: 'test2',
                type: 'baz'
            }]
        });

        const errors = await model.validate({ skipMissingProperties: true });
        expect(errors).to.have.length(1);
        const zzzError = errors[0];
        expect(zzzError.children).to.have.length(1);
        const test1Error = zzzError.children[0].children[0];
        expect(test1Error.constraints).to.have.property('isIn');
    });

    it('validates a date', async () => {
        const now = new Date();
        const model = new XXX({
            effectiveDate: `${now.getUTCFullYear()}-${now.getUTCMonth() + 1}-${now.getUTCDate()}`
        });

        const errors = await model.validate({ skipMissingProperties: true });
        expect(errors).to.have.length(0);
    });

    it('validates a date string', async () => {
        const model = new XXX({
            birthdate: '1980-05-12'
        });

        const errors = await model.validate({ skipMissingProperties: true });
        expect(errors).to.have.length(0);
    });

    it('validates a group', async () => {
        const today = new Date();
        const model = new XXX({
            name: 'First Last',
            description: 'This is a description',
            count: 4,
            birthdate: '1985-11-02',
            effectiveDate: `${today.getUTCFullYear()}-${today.getUTCMonth() + 1}-${today.getUTCDate()}`,
            zzzs: [{
                name: 'test zzz',
                type: 'foo'
            }]
        });

        const errors = await model.validate({ groups: [ValidationGroup.Post] });
        expect(errors).to.have.length(0);
    });
});
