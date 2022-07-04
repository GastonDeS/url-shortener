import { IErrorData } from '../interfaces/error.interface';
import HttpException from './http.exception';

class GenericException extends HttpException {
    constructor(error: IErrorData) {
        super(error.status, error.internalStatus, error.message);
    }
}

export default GenericException;