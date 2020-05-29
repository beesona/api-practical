# Router

## Example

```javascript
import { AuthorizedRequest, ValidateToken } from '@nelnet/quasar-security-middleware';
import { ContextRequest, DELETE, GET, HttpError, PATCH, Path, PathParam, POST, PUT, QueryParam, Return } from 'typescript-rest';
import { Security, Tags } from 'typescript-rest-swagger';
import { getPagingInfo } from '../lib/getPagingInfo';
import DataManager from '../managers/DataManager';
import { BadRequestError, InternalServerError, NotFoundError, NotImplementedError } from '../types/error';
import { XXX, XXXPostBody } from '../types/model/XXX';
import { PagedResponseBody, ResponseBody } from '../types/response';
import { ValidationGroup } from '../types/validation';

const logger = log4js.getLogger(path.basename(__filename));

@Tags('XXX Service')
@Security('bearer_key')
@Path('/xxxs')
class XXXV1Router {

    @ContextRequest
    private request: AuthorizedRequest;
    private data = new DataManager();

    /**
     * Get all XXXs
     */
    @GET
    async get(@QueryParam('offset') offset: number = 0, @QueryParam('limit') limit: number = 20): Promise<PagedResponseBody<XXX[]>> {
        const { tenantId, servicerId } = this.request.user;

        try {
            const [items, totalCount] = await Promise.all([
                this.data.getXXXs(tenantId, servicerId, { offset, limit }),
                this.data.countXXXs(tenantId, servicerId)
            ]);
            return {
                data: items,
                paging: getPagingInfo('/v1/xxxs', offset, limit, totalCount)
            };
        } catch (err) {
            throw (err instanceof HttpError) ? err : new InternalServerError({ description: 'Query Issue', info: err });
        }
    }

    /**
     * Get a XXX by ID
     * @param xxxId The ID of the XXX to retrieve
     */
    @Path(':xxxId')
    @GET
    async getById(@PathParam('xxxId') xxxId: string): Promise<ResponseBody<XXX>> {
        const { tenantId, servicerId } = this.request.user;

        try {
            const item = await this.data.getXXX(tenantId, servicerId, xxxId);

            if (!item) {
                throw new NotFoundError({ description: 'Not Found', info: `No XXX found with id ${xxxId}` });
            }

            return {
                data: item
            };
        } catch (err) {
            throw (err instanceof HttpError) ? err : new InternalServerError({ description: 'Query Issue', info: err });
        }
    }

    /**
     * Create a new XXX
     * @param body The XXX to create
     */
    @POST
    async post(body: XXXPostBody): Promise<Return.NewResource<ResponseBody<XXX>>> {
        const { tenantId, servicerId } = this.request.user;
        const xxx = new XXX(body);

        try {
            await xxx.validateOrReject({ groups: [ValidationGroup.Post] });
        } catch (validationErrors) {
            throw new BadRequestError({ description: 'Validation Error', body: validationErrors });
        }

        try {
            const item = await this.data.addXXX(tenantId, servicerId, xxx);
            return new Return.NewResource<ResponseBody<XXX>>(`/xxxs/${item.id}`, { data: item });
        } catch (err) {
            throw (err instanceof HttpError) ? err : new InternalServerError({ description: 'Query Issue', info: err });
        }
    }

    /**
     * Replace a XXX
     * @param xxxId The ID of the XXX to replace
     * @param body The updated XXX
     */
    @Path(':xxxId')
    @PUT
    async put(@PathParam('xxxId') xxxId: string, body: XXX): Promise<ResponseBody<XXX>> {
        const { tenantId, servicerId } = this.request.user;

        throw new NotImplementedError({ description: 'Not Implemented' });
    }

    /**
     * Update a XXX with partial data
     * @param xxxId The ID of the XXX to update
     * @param body The partial XXX data
     */
    @Path(':xxxId')
    @PATCH
    async patch(@PathParam('xxxId') xxxId: string, body: XXX): Promise<ResponseBody<XXX>> {
        const { tenantId, servicerId } = this.request.user;

        throw new NotImplementedError({ description: 'Not Implemented' });
    }

    /**
     * Deletes all data for specified tenant and servicer
     *
     */
    @Path('/delete')
    @DELETE
    async deleteAll(): Promise<ResponseBody<any>> {
        const { tenantId, servicerId, groups } = this.request.user;

        if (groups.indexOf('admin') > -1 && Math.sign(Number(tenantId)) === -1 && Math.sign(Number(servicerId)) === -1) {
            try {
                return {
                    data: {
                        tenantId, servicerId, results: [] = await Promise.all([
                            this.data.deleteAllByTenantIdServicerId(tenantId, servicerId),
                            // add additional data managers here as needed ...
                        ])
                    }
                };
            } catch (error) {
                logger.error('Error deleting data from tables', error);
                throw (error instanceof HttpError) ? error : new InternalServerError({ description: 'Query Issue', info: error.message });
            }
        } else {
            throw new BadRequestError({ description: 'Delete is only allowed by admin for negative integers of both Tenant and Servicer Ids', info: `tenantId: ${tenantId} servicerId: ${servicerId}` });
        }
    }

    /**
     * Delete a XXX
     * @param xxxId The ID of the XXX to delete
     */
    @Path(':xxxId')
    @DELETE
    async delete(@PathParam('xxxId') xxxId: string) {
        const { tenantId, servicerId } = this.request.user;

        throw new NotImplementedError({ description: 'Not Implemented' });
    }
}

export default XXXV1Router;

```