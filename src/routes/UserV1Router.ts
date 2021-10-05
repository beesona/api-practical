import { DELETE, GET, HttpError, Path, PathParam, POST, PUT, QueryParam, Return } from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';
import { getPagingInfo } from '../lib/getPagingInfo';
import { ConsoleLoggingManager } from '../managers/ConsoleLoggingManager';
import { ILoggingManager } from '../managers/ILoggingManager';
import { UserManager } from '../managers/UserManager';
import { BadRequestError, InternalServerError, NotFoundError, NotImplementedError } from '../types/error';
import { User, UserObject, UserPostBody } from '../types/model/User';
import { PagedResponseBody, ResponseBody } from '../types/response';
import { ValidationGroup } from '../types/validation';

@Tags('User Service')
@Path('/User')
class UserV1Router {

    private data: UserManager;
    private logger: ILoggingManager;

    constructor(){
        this.data = new UserManager();
        this.logger = new ConsoleLoggingManager(UserV1Router.name);
    }

    /**
     * Get all Users
     * @param offset The start of the page
     * @param limit the size of the page
     */
    @GET
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    async get(@QueryParam('offset') offset: number = 0, @QueryParam('limit') limit: number = 20): Promise<PagedResponseBody<User[]>> {
        try {
            const [
                items, totalCount
            ] = await Promise.all([
                this.data.get(offset, limit),
                this.data.count()
            ]);
            return {
                data: items,
                paging: getPagingInfo('/v1/Users', offset, limit, totalCount)
            };
        } catch (err) {
            throw (err instanceof HttpError) ? err : new InternalServerError({ description: 'Query Issue', info: err });
        }
    }

    /**
     * Get a User by ID
     * @param UserId The ID of the User to retrieve
     */
    @Path(':userid')
    @GET
    async getById(@PathParam('userid') userId: string): Promise<ResponseBody<User>> {

        try {
            const item = await this.data.getById(userId);

            if (!item) {
                throw new NotFoundError({ description: 'Not Found', info: `No User found with id ${userId}` });
            }

            return {
                data: item
            };
        } catch (err) {
            throw (err instanceof HttpError) ? err : new InternalServerError({ description: 'Query Issue', info: err });
        }
    }

    /**
     * Create a new User
     * @param body The User to create
     */
    @POST
    async post(body: UserPostBody): Promise<Return.NewResource<ResponseBody<User>>> {

        const user = new UserObject(body.firstName, body.lastName, body.address);

        try {
            await user.validateOrReject({ groups: [
                ValidationGroup.Post
            ] });
        } catch (validationErrors) {
            throw new BadRequestError({ description: 'Validation Error', body: validationErrors });
        }

        try {
            const item = await this.data.add(user);
            return new Return.NewResource<ResponseBody<User>>(`/Users/${item.id}`, { data: item });
        } catch (err) {
            throw (err instanceof HttpError) ? err : new InternalServerError({ description: 'Query Issue', info: err });
        }
    }

    /**
     * Update a User
     * @param UserId The ID of the User to replace
     * @param body The updated User
     */
    @Path(':UserId')
    @PUT
    async put(@PathParam('UserId') UserId: string, body: User): Promise<ResponseBody<User>> {

        throw new NotImplementedError({ description: 'Not Implemented' });
    }

    /**
     * Delete a User
     * @param UserId The ID of the User to delete
     */
    @Path(':userid')
    @DELETE
    async delete(@PathParam('userid') userId: string): Promise<ResponseBody<string>> {

        throw new NotImplementedError({ description: 'Not Implemented' });
    }
}

export default UserV1Router;