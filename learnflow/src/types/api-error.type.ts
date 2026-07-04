export interface IApiError {
    success: boolean;
    message: string;
    statusCode: number;
    errors?: Record<string, unknown>;
    stack?: string; 

}