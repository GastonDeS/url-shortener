export const ERRORS = {
    BAD_REQUEST: {
        GENERAL: { status: 400, internalStatus: 'BAD_REQUEST', message: 'Bad request.' },
        PARAMS: { status: 400, internalStatus: 'INVALID_PARAMS', message: 'Invalid parameters.' },
    },
    NOT_FOUND: {
        GENERAL: { status: 404, internalStatus: 'NOT_FOUND', message: 'Not found.' },
    }
}