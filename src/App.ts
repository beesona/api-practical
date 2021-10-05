import * as bodyParser from 'body-parser';
import cors = require('cors');
import express = require('express');
import requestIdMiddleware = require('express-request-id');
import * as log4js from 'log4js';
import { Server } from 'typescript-rest';
import errorFormatMiddleware from './lib/errorFormatMiddleware';
import UserV1Router from './routes/UserV1Router';
import { ApiConfig } from './types/config';

// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unused-vars
const dotenv = require('dotenv').config();
// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unused-vars
const apiConfig: ApiConfig = require('./config/api-config');
const basePath = '/';
const corsOptions = {
    origin(origin, callback) {
        callback(null, true);
    }
};

// Creates and configures an ExpressJS web server.
class App {
    // ref to Express instance
    public app: express.Application;

    // Run configuration methods on the Express instance.
    constructor() {
        // create our Manager.

        this.app = express();
        this.middleware();
        this.routes();
        this.handleErrors();
    }

    // Configure Express middleware.
    private middleware(): void {
        const logger = log4js.getLogger('routes');
        this.app.use(log4js.connectLogger(logger, {
            level: 'auto',
            format: `{ 
                "userName": ":res[userName]", 
                "borrowerId": ":res[borrowerId]", 
                "role": ":res[role]", 
                "remoteAddress": ":remote-addr", 
                "X-Request-Id": ":res[X-Request-Id]", 
                "X-Amzn-Trace-Id": ":req[X-Amzn-Trace-Id]", 
                "method": ":method", 
                "URL": ":url", 
                "status": :status, 
                "content-length": :content-length, 
                "response-time": :response-time, 
                "referrer": ":referrer", 
                "user-agent": ":user-agent"
            }`
        }));
        this.app.use(cors(corsOptions));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.text());
        this.app.use(requestIdMiddleware());
    }

    // Configure API endpoints.
    private routes(): void {
        this.swagger();
        this.routesNoTokenRequired();
    }

    // Routes that don't require a token
    private routesNoTokenRequired(): void {
        const router = express.Router();
        Server.buildServices(router, UserV1Router);
        this.app.use(basePath, router);
    }

    private handleErrors(): void {
        this.app.use(errorFormatMiddleware);
    }

    // Configure Swagger
    private swagger(): void {
        Server.swagger(this.app, './dist/swagger.json', `${basePath}/docs`);
    }
}

export default new App().app;
