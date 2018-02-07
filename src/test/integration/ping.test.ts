import * as Code from 'code';
import * as Lab from 'lab';
import * as server from '../../server';

const lab = exports.lab = Lab.script();

lab.experiment('ping', () => {
    lab.test('Should return pong', async (done) => {
        const options = {
            method: 'GET',
            url: '/ping',
        };

        const srv = await server.init();

        const response = await srv.inject(options);

        Code.expect(response.statusCode).to.equal(200);
        Code.expect(response.result).to.equal('pong');
    });
});

