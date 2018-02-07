import * as Hapi from 'hapi';
import * as Boom from 'boom';
import { ApplicationError, ForbiddenError, RecordNotFoundError, UnauthorizedError } from '../errors/index';
import logger from '../utils/logger';

export const errorHandler = (server: Hapi.Server) => {

    server.ext('onPreResponse', (request, reply) => {
        const response = request.response;
        if (!response.isBoom) {
            return reply.continue();
        }

        let boom;

        if (response instanceof ForbiddenError) {
            boom = Boom.forbidden(response.message);
        } else if (response instanceof UnauthorizedError) {
            boom = Boom.unauthorized(response.message);
        } else if (response instanceof RecordNotFoundError) {
            boom = Boom.notFound(response.message);
        } else if (response instanceof ApplicationError) {
            boom = Boom.badRequest(response.message, response.data);
        } else {
            boom = response;
        }
        if (boom.isServer) {
            logger.error(response);
        } else {
            logger.info(response);
        }

        if (boom.data) {
            boom.output.payload.data = boom.data;
        }

        return reply(boom);
    });
};
