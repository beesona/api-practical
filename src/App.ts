import customDomainMiddleware from '@nelnet/apigateway-customdomain-middleware';
import lowercaseQueryMiddleware from '@nelnet/express-lowercase-query';
import { verifyMiddleware } from '@nelnet/quasar-security-middleware';
import * as bodyParser from 'body-parser';
import cors = require('cors');
import express = require('express');
import requestIdMiddleware = require('express-request-id');
import * as log4js from 'log4js';
import { Server } from 'typescript-rest';
import errorFormatMiddleware from './lib/errorFormatMiddleware';
import HealthTokenV1Router from './routes/HealthTokenV1Router';
import HealthV1Router from './routes/HealthV1Router';
import { ApiConfig } from './types/config';
import { NotFoundError } from './types/error';

const dotenv = require('dotenv').config();
const apiConfig: ApiConfig = require('./config/api-config');
const AWSXRay = require('aws-xray-sdk');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));
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
        this.app = express();
        this.middleware();
        this.routes();
        this.handleErrors();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.app.use(customDomainMiddleware);
        const logger = log4js.getLogger('routes');
        this.app.use(log4js.connectLogger(logger, {
            level: 'auto',
            // tslint:disable-next-line:max-line-length
            format: '{ "userName": ":res[userName]", "borrowerId": ":res[borrowerId]", "role": ":res[role]", "remoteAddress": ":remote-addr", "X-Request-Id": ":res[X-Request-Id]", "X-Amzn-Trace-Id": ":req[X-Amzn-Trace-Id]", "method": ":method", "URL": ":url", "status": :status, "content-length": :content-length, "response-time": :response-time, "referrer": ":referrer", "user-agent": ":user-agent"}'
        }));
        this.app.use(cors(corsOptions));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.text());
        this.app.use(requestIdMiddleware());
        this.app.use(lowercaseQueryMiddleware);
    }

    // Configure API endpoints.
    private routes(): void {
        this.swagger();
        this.routesNoTokenRequired();
        this.routesTokenRequired();
        this.routes404();
    }

    // Routes that don't require a token
    private routesNoTokenRequired(): void {
        const router = express.Router();
        Server.buildServices(router, HealthV1Router);
        this.app.use(basePath, router);
    }

    // Routes that do require a token
    private routesTokenRequired(): void {
        // Applying verifyMiddleware to express globally instead of tokenRouter gives 401 precedence over 404
        this.app.use(verifyMiddleware);
        const tokenRouter = express.Router();
        Server.buildServices(tokenRouter, HealthTokenV1Router);
        this.app.use(basePath, tokenRouter);
    }

    // Routes not matching respond with 404 (still require a token)
    private routes404(): void {
        this.app.use(() => {
            throw new NotFoundError({ description: 'The requested resource does not exist' });
        });
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
