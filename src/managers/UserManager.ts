import { User } from "../types/model/User";
// TODO: Fix the project to allow JSON objects. Hint: listen to hints :) 
import data from '../config/database/example_data.json';
import { NotImplementedError } from "../types/error";

export class UserManager { 

    // TODO: implement and instantiate a LoggingManager.
    private userData: User[] = data;

    // TODO: update this method to support pagination.
    getAll(): User[] { 
        return this.userData;
    }

    // TODO: implement a method to return a user by ID.
    getById(id: string): User { 
        throw new NotImplementedError({ description: 'Not Implemented' });
    }

    // TODO: Implement an Add User method to add a UserObject.
    add(user: User): User {
        throw new NotImplementedError({ description: 'Not Implemented' });
    }

    // TODO: implement a method to update an existing user.
    update(): string { 
        throw new NotImplementedError({ description: 'Not Implemented' });
    }

    // TODO: imeplement a method to delete an existing user.
    delete(id: string): string { 
        throw new NotImplementedError({ description: 'Not Implemented' });
    }
}