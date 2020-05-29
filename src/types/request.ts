import { Request } from 'express';

export interface AuthorizedRequest extends Request {
    user: {
        tenantId: string;
        servicerId: string;
        lenderId: string;
        borrowerId: string;
    };
}
