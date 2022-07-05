import { NextFunction, Request, Response } from 'express';
import { ERRORS } from '../constants/error.constant';
import GenericException from '../exceptions/generic.exception';
import UserAuthService from '../services/auth.service';

declare global {
    namespace Express {
        export interface Request {
            user: {email: string, id: string, role?: number};
        }
    }
}

const userAuthMiddleware = (request: Request, response: Response, next: NextFunction) : void => {
    const token = request.headers['x-access-token'] as string;

	if (!token) {
		throw new GenericException(ERRORS.FORBIDDEN.MISSING_TOKEN);
	}
	let decodedToken;
	try {
		decodedToken = UserAuthService.getInstance().verifyToken(token);
	} catch (err) {
        const error = err as GenericException;
		response.status(error.status).send({error: error.message});
		return;
	}
	request.user = decodedToken as {email: string, id: string};
	next();
};

export default userAuthMiddleware;