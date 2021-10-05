import uuid = require("uuid");
import { IsUUID } from 'class-validator';
import { Validatable } from "../validation";

export interface User {
    
    id: string;
    firstName: string;
    lastName: string;
    address: Address;
}

export interface Address { 
    street: string;
    city: string;
    state: string;
    zip: string;
}

export interface UserPostBody { 
    firstName: string;
    lastName: string;
    address: Address;
}

export class UserObject extends Validatable implements User { 
    @IsUUID()
    id: string;
    firstName: string;
    lastName: string;
    address: Address;

    constructor(firstName?: string, lastName?: string, address?: Address) { 
        super();
        this.id = uuid();
        this.firstName = firstName || '';
        this.lastName = lastName || '';
        this.address = address || new AddressObject();
    }
}

export class AddressObject implements Address { 
    street: string;
    city: string;
    state: string;
    zip: string;

    constructor() {
        this.street = '';
        this.city = '';
        this.state = '';
        this.zip = '';
    }
}