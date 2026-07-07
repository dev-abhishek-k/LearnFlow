
import jwt, { SignOptions } from "jsonwebtoken";
import crypto from "crypto";
export interface JwtPayload {
    id: string; 
    role: string;
}
export interface RefreshTokenPayload {
    id: string;
}
interface RandomToken {
    rawToken: string;
    hashedToken: string;
}
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION as SignOptions["expiresIn"];
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION as SignOptions["expiresIn"];

export const generateAccessToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION });
};

export const verifyAccessToken = (token: string): JwtPayload => {
    return jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;
};
export const generateRefreshToken = (payload: RefreshTokenPayload): string => {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });
};

export const verifyRefreshToken = (token: string): RefreshTokenPayload => {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as RefreshTokenPayload;
};

export const generateRandomToken = (): RandomToken => {
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
    return {rawToken, hashedToken};
};