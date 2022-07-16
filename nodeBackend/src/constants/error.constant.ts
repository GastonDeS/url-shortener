export const ERRORS = {
    BAD_REQUEST: {
        GENERAL: { status: 400, internalStatus: 'BAD_REQUEST', message: 'Bad request.' },
        PARAMS: { status: 400, internalStatus: 'INVALID_PARAMS', message: 'Invalid parameters.' },
    },
    NOT_FOUND: {
        GENERAL: { status: 404, internalStatus: 'NOT_FOUND', message: 'Not found.' },
        USER: { status: 404, internalStatus: 'USER', message: 'User not found.' },
    },
    FORBIDDEN: {
        GENERAL: { status: 403, internalStatus: 'FORBIDDEN', message: 'Forbidden.' },
        UNAUTHORIZED: { status: 403, internalStatus: 'UNAUTHORIZED', message: 'Company unauthorized.' },
        MISSING_TOKEN: { status: 403, internalStatus: 'MISSING_TOKEN', message: 'No token provided.'},
    }
}