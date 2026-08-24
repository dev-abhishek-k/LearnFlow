import { IApiError } from '@/types/api-error.type';
import { HTTP_STATUS } from './http-status';

export class ApiError extends Error implements IApiError {
    success: false;
    message: string;
    statusCode: number;
    errors?: Record<string,unknown>| undefined;
    stack?: string; 

    constructor(
        message: string,
        statusCode: number,
        errors?: Record<string,unknown>| undefined,
        stack?: string
    ){
         super(message);

    this.success = false;
    this.message = message;
    this.statusCode = statusCode;
    this.errors = errors;
    if (stack) {
        this.stack = stack;
    }else {
        Error.captureStackTrace(this, this.constructor);
    }
    }
    static badRequest(message: "Bad request", errors?: Record<string,unknown>): ApiError {
        return new ApiError(message, HTTP_STATUS.BAD_REQUEST, errors);
    }   
    static unauthorized(message: "Unauthorized", errors?: Record<string,unknown>): ApiError {
        return new ApiError(message, HTTP_STATUS.UNAUTHORIZED, errors);
    }
    static forbidden(message: "Forbidden", errors?: Record<string,unknown>): ApiError {
        return new ApiError(message, HTTP_STATUS.FORBIDDEN, errors);
    }
    static notFound(message: "Not found", errors?: Record<string,unknown>): ApiError {
        return new ApiError(message, HTTP_STATUS.NOT_FOUND, errors);
    }
    static conflict(message: "Conflict", errors?: Record<string,unknown>): ApiError {
        return new ApiError(message, HTTP_STATUS.CONFLICT, errors);
    }
    static internalServerError(message: "Internal server error", errors?: Record<string,unknown>): ApiError {
        return new ApiError(message, HTTP_STATUS.INTERNAL_SERVER_ERROR, errors);
    }
}

