import * as Code from 'code';
import * as Lab from 'lab';
import server from '../../server';

const lab = exports.lab = Lab.script();

lab.experiment('ping', () => {
    lab.test('Should return pong', (done) => {
        const options = {
            method: 'GET',
            url: '/ping',
        };

        server.inject(options, (response: any) => {
            Code.expect(response.statusCode).to.equal(200);
            Code.expect(response.result.data).to.equal('pong');

            done();
        });
    });
});

