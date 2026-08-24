import { HTTP_STATUS } from "./http-status";
import { IApiResponse } from "@/types/api-response.type";
import {NextResponse} from "next/server";   
export class  ApiResponse<T> implements IApiResponse<T> {
    success: boolean;
    message: string;
    data?: T | undefined;

    constructor(success: boolean, message: string, data?: T | undefined) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
    static ok<T>(message: string, data?: T | undefined): NextResponse {
        return NextResponse.json(new  ApiResponse<T>(true, message, data), { status: HTTP_STATUS.OK });  
            }

    static created<T>(message: string, data?: T | undefined): NextResponse {
        return NextResponse.json(new  ApiResponse<T>(true, message, data), { status: HTTP_STATUS.CREATED });
    }
    static noContent(message: string): NextResponse {
        return NextResponse.json(new  ApiResponse<null>(true, message, null), { status: HTTP_STATUS.NO_CONTENT });
    }   
}