
import * as Joi from 'joi';
import { ValidationError, RecordNotFoundError } from '../errors/index';

const validator = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

interface IAuthCreateActionInput {
    username: string;
    password: string;
}

const exec = async (params: IAuthCreateActionInput) => {
    Joi.attempt(params, validator);

    const user = await checkCredentials(params.username, params.password);

    return user;
};

const checkCredentials = async (username: string, password: string) => {
    const user = {
        id: 1,
        username: 'admin',
        password: '123456',
    };

    if (user.username !== username) {
        throw new RecordNotFoundError('User not found.');
    }

    if (user.username === username &&
        user.password === password) {
        return user;
    }

    throw new ValidationError('Username or password invalid.');
};

export {
    exec,
    validator,
};
