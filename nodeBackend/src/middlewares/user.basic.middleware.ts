import { NextFunction, Request, Response } from 'express';
import { buffer } from 'stream/consumers';
import { ERRORS } from '../constants/error.constant';
import GenericException from '../exceptions/generic.exception';
import UserAuthService from '../services/auth.service';

declare global {
    namespace Express {
        export interface Request {
            userBasic: {email: string, password: string};
        }
    }
}

const userBasicAuthMiddleware = (request: Request, response: Response, next: NextFunction) : void => {
    const authHeader = request.headers['x-basic-auth'] as string;

	if (!authHeader) {
		throw new GenericException(ERRORS.FORBIDDEN.MISSING_TOKEN);
	}
	let decodedToken;
	try {
		decodedToken = getEmailAndpasswordFromHeader(authHeader);
	} catch (err) {
        const error = err as GenericException;
		response.status(error.status).send({error: error.message});
		return;
	}
	request.userBasic = decodedToken as {email: string, password: string};
	next();
};

const getEmailAndpasswordFromHeader = (authHeader: string) => {
    const strauth = Buffer.from(authHeader, 'base64').toString();
    const splitIndex = strauth.indexOf(':');
    const login = strauth.substring(0, splitIndex);
    const password = strauth.substring(splitIndex + 1);
    return {email: login, password}
}

export default userBasicAuthMiddleware;