export const goodPlugin = async (server) => {
    await server.register([
        {
            register: require('good'),
            options: {
                reporters: {
                    console: [{
                        module: 'good-console',
                    }, 'stdout'],
                },
            },
        },
    ]);
};
