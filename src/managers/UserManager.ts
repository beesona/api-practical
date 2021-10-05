import { User } from "../types/model/User";
import data from '../config/database/example_data.json';

export class UserManager { 

    private userData: User[] = data;

    constructor(){
    }

    count(): number { 
        return this.userData.length;
    }

    getAll(): User[] { 
        return this.userData;
    }

    get(offset: number, limit: number): User[] { 
        const result =  this.userData.slice(offset, offset + limit);
        return result;
    }

    getById(id: string): User { 
        return this.userData.find(i => i.id === id);
    }

    add(user: User): User {
        this.userData.push(user);
        
        return user;
    }

    update(id: string, user: User): string { 
        const originalItem = this.getById(id);
        const itemIndex = this.userData.indexOf(originalItem);
        this.userData[itemIndex] = user;
        return `${id} updated.`;
    }

    delete(id: string): string { 
        const user = this.getById(id);
        this.userData = this.userData.filter(user => user !== user);

        return 'User Removed.';
    }
}