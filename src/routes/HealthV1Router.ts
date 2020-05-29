import * as log4js from 'log4js';
import * as path from 'path';
import { Context, GET, Path, ServiceContext } from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';
import { HealthStatus } from '../types/healthModel';
import { ResponseBody } from '../types/response';

const logger = log4js.getLogger(path.basename(__filename));
const metricsLog = log4js.getLogger('metrics');


@Tags('Health')
@Path('/health')
export class HealthV1Router {

    @Context
    context: ServiceContext;

    /**
     * Returns health status of service
     */
    @GET
    public get(): ResponseBody<HealthStatus> {
        // logger.debug("In get() with RequestId: " + this.context.request.id);
        // metricsLog.info('Metrics here...');
        return {
            data: { message: 'Server Up' }
        };
    }
}

export default HealthV1Router;
