import debug = require('debug');
import { createServer } from 'http';
import { getLogger } from 'log4js';
import * as path from 'path';
import App from './App';
import { ApiConfig } from './types/config';

debug('ts-express:server');

// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unused-vars
const apiConfig: ApiConfig = require('./config/api-config');
// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unused-vars
const dotenv = require('dotenv').config();
const logger = getLogger(path.basename(__filename));
const port = normalizePort(process.env.PORT || apiConfig.apiSettings.localPort);

App.set('port', port);
const server = createServer(App);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: number | string): number | string | boolean {
    const result: number = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(result)) {
        return val;
    } else if (result >= 0) {
        return result;
    } else {
        return false;
    }
}

function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = (typeof port === 'string') ? `Pipe ${port}` : `Port ${port}`;
    switch (error.code) {
    case 'EACCES':
        logger.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
    case 'EADDRINUSE':
        logger.error(`${bind} is already in use`);
        process.exit(1);
        break;
    default:
        throw error;
    }
}

function onListening(): void {
    const addr = server.address();
    const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    //new NotifyManager().publish(new StartEvent(`<SERVICENAME> started at ${new Date()} ${JSON.stringify(addr)}`));
    logger.info(`PracticalAPI Listening on ${bind}`);
}
