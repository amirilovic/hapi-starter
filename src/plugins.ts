import * as Inert from 'inert';
import * as Vision from 'vision';
import * as HapiSwagger from 'hapi-swagger';
import * as Good from 'good';
import * as config from 'config';

const Package = require('../package.json');

const DEVELOPMENT = 'development';

let plugins = [];

if (config.util.getEnv('NODE_ENV') === DEVELOPMENT) {

  // add hapi swagger integration
  plugins = plugins.concat([Inert,
    Vision,
    {
      register: HapiSwagger,
      options: {
        info: {
          title: Package.description,
          version: Package.version,
        },
        pathPrefixSize: 4,
      },
    }]);

  // add good console for log reporting
  plugins.push({
    register: Good,
    options: {
      reporters: {
        console: [{
          module: 'good-console',
        }, 'stdout'],
      },
    },
  });
}

export = plugins;
