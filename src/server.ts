import { Server } from 'hapi';
import * as config from 'config';
import routes from './routes';
import logger from './utils/logger';
import { registerPlugins } from './plugins';

const server = new Server();

server.connection({
  port: config.get<number>('app.port'),
  routes: {
    cors: true,
  },
});

const init = async () => {

  await registerPlugins(server);

  server.route(routes);

  return server;
};

const stop = () => {
  // Wait 10 secs for existing connection to close and then exit.
  return server.stop({ timeout: 10 * 1000 });
};

export { init, stop };
