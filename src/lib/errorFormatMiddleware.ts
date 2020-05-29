import { NextFunction, Request, Response } from 'express';
import * as httpStatus from 'http-status';
import { HttpError } from 'typescript-rest';
import { ExtendedError } from '../types/error';

function errorFormatMiddleware(err, req: Request, res: Response, next: NextFunction) {
    if (res.headersSent) {
        return next(err);
    }

    if (err instanceof HttpError) {
        const errorBody = {
            description: err.message
        };
        if (err instanceof ExtendedError) {
            Object.assign(errorBody, {
                info: err.info,
                body: err.body
            });
        }

        res.status(err.statusCode).json(errorBody);
    } else {
        const errorBody = {
            description: err.message,
            body: err.stack
        };
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(errorBody);
    }
}

export default errorFormatMiddleware;
