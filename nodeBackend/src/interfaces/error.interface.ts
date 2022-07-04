export interface IErrorResponse {
    error: any;
    code?: number;
}

// agregar origin
export interface IErrorData {
    status: number;
    internalStatus: string;
    message: string;
}
