import * as config from 'config';
import { Request, ReplyNoContinue, RouteConfiguration } from 'hapi';
import * as authCreateAction from './auth-create-action';
import { issueToken } from '../utils/jwt-service';

const API_PATH = '/' + config.get('app.name') + '/api/1.0';

const authRoutes: RouteConfiguration[] = [
    {
        method: 'POST',
        path: '/auth',
        handler: async (request: Request, reply: ReplyNoContinue) => {

            const user = await authCreateAction.exec(request.payload);

            const token = issueToken(user);

            reply({
                token,
                user: { id: user.id },
            });
        },
        config: {
            auth: false,
            description: 'Login',
            notes: 'Returns token with user',
            tags: ['api', 'User'],
            validate: {
                payload: authCreateAction.validator,
            },
        },
    },
];

export default authRoutes;
