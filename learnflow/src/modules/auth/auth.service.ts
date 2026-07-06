import { authRepository } from "./auth.repository";
import { ApiError } from "@/lib/api-error";
import { HTTP_STATUS } from "@/lib/http-status";
import { hashPassword, comparePassword } from "@/lib/auth/password";
import type {  User } from "@/generated/prisma/client";
import { generateAccessToken,generateRefreshToken } from "@/lib/auth/jwt";
import { AUTH_MESSAGES } from "./auth.constants";
import { LoginResponse,RegisterInput } from "./auth.types";

 class AuthService {
  async register(data: RegisterInput): Promise<User> {
    const existinguser = await authRepository.findUserByEmail(data.email);
    if (existinguser) {
      throw new ApiError(
        AUTH_MESSAGES.USER_ALREADY_EXISTS,
        HTTP_STATUS.CONFLICT,
      );
    }
    const hashedPassword = await hashPassword(data.password );
    return  authRepository.createUser({
      ...data,  
      password: hashedPassword,
    });
  }
  async Login(email: string, Password: string): Promise<LoginResponse> {
    const user = await authRepository.findUserByEmail(email);
    if (!user) {
      throw new ApiError(
        AUTH_MESSAGES.INVALID_CREDENTIALS,
        HTTP_STATUS.UNAUTHORIZED
      );
    }
    const isMatch = await comparePassword(Password, user.password);
    if (!isMatch) {
      throw new ApiError(
        AUTH_MESSAGES.INVALID_CREDENTIALS,
        HTTP_STATUS.UNAUTHORIZED
      );
    }
    const accessToken = generateAccessToken({Id:user.id,role:user.role});
    const refreshToken = generateRefreshToken({Id:user.id}); 
    return { user, accessToken , refreshToken  }; };
  }                     

export const authService = new AuthService();