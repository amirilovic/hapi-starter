import * as jwt from 'jsonwebtoken';
import * as config from 'config';

export const issueToken = (user) => {
    const secret = config.get('app.jwtSecret');
    return jwt.sign({ id: user.id }, secret);
};
