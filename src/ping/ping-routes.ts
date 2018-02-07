import * as config from 'config';
import { Request, ReplyNoContinue, RouteConfiguration } from 'hapi';
import * as pingAction from './ping-action';

const API_PATH = '/' + config.get('app.name') + '/api/1.0';

const pingRoutes: RouteConfiguration[] = [
    {
        method: 'GET',
        path: '/ping',
        handler: async (request: Request, reply: ReplyNoContinue) => {
            const result = await pingAction.exec();
            reply(result);
        },
        config: {
            auth: false,
            description: 'Ping the API',
            notes: 'Returns Pong',
            tags: ['api', 'Ping'],
        },
    }, {
        method: 'POST',
        path: '/ping',
        handler: async (request: Request, reply: ReplyNoContinue) => {
            const result = await pingAction.exec();
            reply(result);
        },
        config: {
            auth: 'jwt',
            description: 'Ping the API with auth',
            notes: 'Returns Pong',
            tags: ['api', 'Ping'],
        },
    },
];

export default pingRoutes;
