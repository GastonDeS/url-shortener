export const ERRORS = {
    BAD_REQUEST: {
        GENERAL: { status: 400, internalStatus: 'BAD_REQUEST', message: 'Bad request.' },
        PARAMS: { status: 400, internalStatus: 'INVALID_PARAMS', message: 'Invalid parameters.' },
    },
    NOT_FOUND: {
        GENERAL: { status: 404, internalStatus: 'NOT_FOUND', message: 'Not found.' },
        USER: { status: 404, internalStatus: 'USER', message: 'User not found.' },
        URL: { status: 404, internalStatus: 'URL_NOT_FOUND', message: 'Url not found.' },
    },
    FORBIDDEN: {
        GENERAL: { status: 403, internalStatus: 'FORBIDDEN', message: 'Forbidden.' },
        UNAUTHORIZED: { status: 403, internalStatus: 'UNAUTHORIZED', message: 'User unauthorized.' },
        MISSING_TOKEN: { status: 403, internalStatus: 'MISSING_TOKEN', message: 'No token provided.'},
    },
    CONFLICT: {
        GENERAL: { status: 409, internalStatus: 'CONFLICT', message: 'Conflict.' },
        URL: { status: 409, internalStatus: 'ALREADY_EXIST_URL', message: 'Already exists url.' },
        URL_LIMIT: { status: 409, internalStatus: 'URL_LIMIT_REACHED', message: 'Url limit reached.' }
    }
}