import * as config from 'config';
import logger from './utils/logger';
import * as server from './server';

const gracefulStopServer = () => {
  server.stop().then(() => {
    logger.info('Shutting down server');
    process.exit(0);
  });
};

process.on('uncaughtException', (err) => {
  logger.error(err, 'Uncaught exception');
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error({
    promise: promise,
    reason: reason,
  }, 'unhandledRejection');
  process.exit(1);
});

process.on('SIGINT', gracefulStopServer);
process.on('SIGTERM', gracefulStopServer);

const startServer = async () => {
  try {
    // add things here before the app starts, like database connection check etc
    const srv = await server.init();
    await srv.start();
    logger.info(`server started at port: ${config.get('app.port')} with env: ${config.util.getEnv('NODE_ENV')}`);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

startServer();
