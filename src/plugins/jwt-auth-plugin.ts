import * as HapiAuthJwt2 from 'hapi-auth-jwt2';
import * as config from 'config';
import { authHandler } from '../middlewares/auth-handler';

export const jwtAuthPlugin = async (server) => {
    await server.register(HapiAuthJwt2);

    server.auth.strategy('jwt', 'jwt', {
        key: config.get('app.jwtSecret'),
        validateFunc: authHandler,
        verifyOptions: { algorithms: ['HS256'] },
    });

    server.auth.default('jwt');
};
