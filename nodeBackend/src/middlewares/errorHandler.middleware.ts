import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/generic.exception';

const ErrorHandlerMiddleware = (error: HttpException, request: Request, response: Response, next: NextFunction) : void => {
    let status = error.status || 500;
    let internalStatus = error.internalStatus;
    let message = error.message || 'Server failed to answer';
    let requestId = request.headers.requestId;

    if(error.response) {
        status = error.response.status;
        internalStatus = error.response.data?.internalStatus;
        message = error.response.data?.message;
        //requestId = error.response.headers['X-Request-Id'];
    }

    if(request.body?.password) {
        request.body.password = "";
    }

    console.error({
        error: { status, internalStatus, message},
        request: { url: request.url, body: request.body, requestId },
    });

    response.status(status).send({
        error:{
            internal_status: internalStatus,
            message
        }
    });
};

export default ErrorHandlerMiddleware;