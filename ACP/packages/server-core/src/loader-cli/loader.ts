import * as dotenv from 'dotenv';

import { dotEnvOptions } from './dotenv-options';

// Make sure dbConfig is imported only after dotenv.config
dotenv.config(dotEnvOptions);

import { dbConfigConnections} from './database.config';

module.exports = dbConfigConnections;
