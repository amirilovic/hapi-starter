import * as HapiSwagger from 'hapi-swagger';
const Package = require('../../package.json');

export const hapiSwaggerPlugin = async (server) => {
    await server.register([
        require('inert'),
        require('vision'), {
            register: HapiSwagger,
            options: {
                info: {
                    title: Package.description,
                    version: Package.version,
                },
                securityDefinitions: {
                    jwt: {
                        type: 'apiKey',
                        name: 'Authorization',
                        in: 'header',
                    },
                },
                security: [{ jwt: [] }],
                pathPrefixSize: 4,
            },
        }]);
};
