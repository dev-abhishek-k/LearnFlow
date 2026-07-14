import { authRepository } from "./auth.repository";
import { ApiError } from "@/lib/api-error";
import { HTTP_STATUS } from "@/lib/http-status";
import { hashPassword, comparePassword } from "@/lib/auth/password";
import type { User } from "@/generated/prisma/client";
import { setAccessTokenCookie, setRefreshTokenCookie } from "@/lib/auth/cookies";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "@/lib/auth/jwt";
import { AUTH_MESSAGES } from "./auth.constants";
import { LoginResponse, RegisterInput, LoginInput, MeResponse, } from "./auth.types";
import crypto from "crypto";
const hashToken = (token: string) => {
  const hash = crypto.createHash("sha256").update(token).digest("hex");
  return hash;
};
function toSafeUser(user: User) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    EmailVerified: user.EmailVerified,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
class AuthService {
  async register(data: RegisterInput): Promise<User> {
    const existinguser = await authRepository.findUserByEmail(data.email);
    if (existinguser) {
      throw new ApiError(
        AUTH_MESSAGES.USER_ALREADY_EXISTS,
        HTTP_STATUS.CONFLICT,
      );
    }
    const hashedPassword = await hashPassword(data.password);
    return authRepository.createUser({
      ...data,
      password: hashedPassword,
    });
  }
  async Login(data: LoginInput): Promise<LoginResponse> {
    const user = await authRepository.findUserByEmail(data.email);
    if (!user) {
      throw new ApiError(
        AUTH_MESSAGES.INVALID_CREDENTIALS,
        HTTP_STATUS.UNAUTHORIZED,
      );
    }
    const isMatch = await comparePassword(data.password, user.password);
    if (!isMatch) {
      throw new ApiError(
        AUTH_MESSAGES.INVALID_CREDENTIALS,
        HTTP_STATUS.UNAUTHORIZED,
      );
    }
    const accessToken = generateAccessToken({ id: user.id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user.id });
    await setAccessTokenCookie(accessToken);
await setRefreshTokenCookie(refreshToken);  
    const hashedRefreshToken = hashToken(refreshToken);
    await authRepository.updateRefreshToken(user.id, hashedRefreshToken);

    return { user: toSafeUser(user), accessToken, refreshToken };
  }

  async refresh(refreshToken: string | undefined) {
    if (!refreshToken) {
      throw new ApiError(
        AUTH_MESSAGES.INVALID_CREDENTIALS,
        HTTP_STATUS.UNAUTHORIZED,
      );
    }
    const decoded = verifyRefreshToken(refreshToken);
    const user = await authRepository.findUserById(decoded.id);
    if (!user) {
      throw new ApiError(
        AUTH_MESSAGES.INVALID_CREDENTIALS,
        HTTP_STATUS.UNAUTHORIZED,
      );
    }
    if (user.refreshToken !== hashToken(refreshToken)) {
      throw new ApiError(
        AUTH_MESSAGES.INVALID_CREDENTIALS,
        HTTP_STATUS.UNAUTHORIZED,
      );
    }
    const accessToken = generateAccessToken({ id: user.id, role: user.role });
    const newRefreshToken = generateRefreshToken({
      id: user.id,
    });

    const hashedRefreshToken = hashToken(newRefreshToken);

    await authRepository.updateRefreshToken(user.id, hashedRefreshToken);

    return { accessToken, refreshToken: newRefreshToken };
  }
  async logout(userId: string) {
    console.log("userId", userId);
    await authRepository.clearRefreshToken(userId);
  }
  async me(id: string): Promise<MeResponse>{ {
    const user = await authRepository.findCurrentuser(id);
    if (!user) {
      throw new ApiError(
        AUTH_MESSAGES.INVALID_CREDENTIALS,
        HTTP_STATUS.UNAUTHORIZED,
      );
    }
    return user ;
  }
}
}
export const authService = new AuthService();
