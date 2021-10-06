import { DELETE, GET, HttpError, Path, PathParam, POST, PUT, QueryParam, Return } from 'typescript-rest';
import { Tags } from 'typescript-rest-swagger';
import { UserManager } from '../managers/UserManager';
import { BadRequestError, InternalServerError, NotFoundError, NotImplementedError } from '../types/error';
import { User, UserObject, UserPostBody } from '../types/model/User';
import { ResponseBody } from '../types/response';
import { ValidationGroup } from '../types/validation';

@Tags('User Service')
@Path('/User')
class UserV1Router {

    private data: UserManager;

    constructor(){
        this.data = new UserManager();
    }

    /**
     * Get all Users
     */
    @GET
    async getAll(): Promise<User[]> { // TODO: make this endpoint support pagination.
        return this.data.getAll();
    }

    /**
     * Get a User by ID
     * @param UserId The ID of the User to retrieve
     */
    @Path(':userid')
    @GET
    async getById(@PathParam('userid') userId: string): Promise<ResponseBody<User>> { // TODO: lets handle our request and response with a try catch block.

        const item = await this.data.getById(userId);
    }

    /**
     * Create a new User
     * @param body The User to create
     */
    @POST
    async post(body: UserPostBody): Promise<Return.NewResource<ResponseBody<User>>> {

        throw new NotImplementedError({ description: 'Not Implemented' }); // TODO: hook to manager.
    }

    /**
     * Update a User
     * @param UserId The ID of the User to replace
     * @param body The updated User
     */
    @Path(':UserId')
    @PUT
    async put(@PathParam('UserId') UserId: string, body: User): Promise<ResponseBody<User>> { // TODO: hook to manager.

        throw new NotImplementedError({ description: 'Not Implemented' });
    }

    /**
     * Delete a User
     * @param UserId The ID of the User to delete
     */
    @Path(':userid')
    @DELETE
    async delete(@PathParam('userid') userId: string): Promise<ResponseBody<string>> { // TODO: hook to manager.

        throw new NotImplementedError({ description: 'Not Implemented' });
    }
}

export default UserV1Router;