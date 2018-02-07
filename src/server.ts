import { Server } from 'hapi';
import * as config from 'config';
import routes from './routes';
import * as plugins from './plugins';
import logger from './utils/logger';
import { errorHandler } from './middlewares/error-handler';
import { authHandler } from './middlewares/auth-handler';

const server = new Server();

server.connection({
  port: config.get<number>('app.port'),
  routes: {
    cors: true,
  },
});

const init = async () => {

  errorHandler(server);

  await server.register(plugins);

  server.auth.strategy('jwt', 'jwt', {
    key: config.get('app.jwtSecret'),
    validateFunc: authHandler,
    verifyOptions: { algorithms: ['HS256'] },
  });

  server.auth.default('jwt');

  server.route(routes);

  return server;
};

const stop = () => {
  // Wait 10 secs for existing connection to close and then exit.
  return server.stop({ timeout: 10 * 1000 });
};

export { init, stop };
