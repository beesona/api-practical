import * as httpStatus from 'http-status';
import { HttpError } from 'typescript-rest';

export abstract class ExtendedError extends HttpError {
    constructor(
        name: string,
        statusCode: number,
        description: string,
        public info?: string,
        public body?: any
    ) {
        super(name, statusCode, description);
    }
}

interface ErrorParams {
    description: string;
    info?: string;
    body?: any;
}

export class BadRequestError extends ExtendedError {
    constructor({ description, info, body }: ErrorParams) {
        super('BadRequestError', httpStatus.BAD_REQUEST, description, info, body);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}

export class NotFoundError extends ExtendedError {
    constructor({ description, info, body }: ErrorParams) {
        super('NotFoundError', httpStatus.NOT_FOUND, description, info, body);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}

export class InternalServerError extends ExtendedError {
    constructor({ description, info, body }: ErrorParams) {
        super('InternalServerError', httpStatus.INTERNAL_SERVER_ERROR, description, info, body);
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
}

export class NotImplementedError extends ExtendedError {
    constructor({ description, info, body }: ErrorParams) {
        super('NotImplementedError', httpStatus.NOT_IMPLEMENTED, description, info, body);
        Object.setPrototypeOf(this, NotImplementedError.prototype);
    }
}

export class UnauthorizedError extends ExtendedError {
    constructor({ description, info, body }: ErrorParams) {
        super('UnauthorizedError', httpStatus.UNAUTHORIZED, description, info, body);
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}
