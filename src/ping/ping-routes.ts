import * as config from 'config';
import errorHandler from '../utils/error-handler';
import { ReplyNoContinue, RouteConfiguration } from 'hapi';

const API_PATH = '/' + config.get('app.name') + '/api/1.0';

const routes: RouteConfiguration[] = [
    {
        method: 'GET',
        path: '/ping',
        handler: errorHandler((request: Request, reply: ReplyNoContinue) => {
            return reply('pong');
        }),
        config: {
            auth: false,
            description: 'Ping the API',
            notes: 'Returns Pong',
            tags: ['api'],
        },
    },
];

export default routes;
