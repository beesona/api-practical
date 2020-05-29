import * as express from 'express';
import * as log4js from 'log4js';
import * as path from 'path';
import { Context, ContextRequest, GET, HttpError, Path, ServiceContext } from 'typescript-rest';
import { Security, Tags } from 'typescript-rest-swagger';
import { BadRequestError, InternalServerError, NotFoundError } from '../types/error';
import { HealthStatus } from '../types/healthModel';
import { ResponseBody } from '../types/response';

@Tags('Health')
@Security('bearer_key')
@Path('/healthtoken')
export class HealthTokenV1Router {
    @Context
    context: ServiceContext;

    @ContextRequest
    request: express.Request;

    /**
     * Returns health status of service
     */
    @GET
    async get(): Promise<ResponseBody<HealthStatus>> {
        // metricsLog.info('Metrics here...');

        try {
            return {
                data: { message: 'Server Up' }
            };
        } catch (err) {
            if (err instanceof HttpError) {
                throw err;
            }
            throw new InternalServerError({
                description: 'Query Issue',
                info: err
            });
        }
    }
}

export default HealthTokenV1Router;
