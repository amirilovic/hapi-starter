import Boom from 'boom';
import { ApplicationError } from '../errors';
import logger from '../utils/logger';
import { Request, ReplyNoContinue } from 'hapi';

function handleError(error, request, reply) {

    let boom;

    if (error.isBoom) {
        boom = error;
    } else if (error instanceof ApplicationError) {
        boom = Boom.badRequest(error.message);
    } else {
        boom = Boom.badImplementation(error);
    }
    if (boom.isServer) {
        logger.error(error);
    } else {
        logger.info(error);
    }

    return reply(boom);
}

export default (handler) => {
    return async (request: Request, reply: ReplyNoContinue) => {
        try {
            return await handler(request, reply);

        } catch (error) {
            return handleError(error, request, reply);
        }
    };
};
