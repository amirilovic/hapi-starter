import * as HapiSwagger from 'hapi-swagger';
import * as HapiAuthJwt2 from 'hapi-auth-jwt2';
import * as config from 'config';
import { jwtAuthPlugin } from './plugins/jwt-auth-plugin';
import { goodPlugin } from './plugins/good-plugin';
import { hapiSwaggerPlugin } from './plugins/hapi-swagger-plugin';
import { errorHandler } from './middlewares/error-handler';

const DEVELOPMENT = 'development';

export const registerPlugins = async (server) => {

  errorHandler(server);

  await jwtAuthPlugin(server);
  await goodPlugin(server);

  if (config.get('app.env') === DEVELOPMENT) {
    await hapiSwaggerPlugin(server);
  }
};
