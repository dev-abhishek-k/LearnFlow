
import { User } from "@/generated/prisma/client";
type SafeUser = Omit<User, "password" | "refreshToken">;
export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}
export interface LoginInput {
  email: string;
  password: string;
  refreshToken?: string;
}
export interface LoginResponse {
  user: SafeUser;
  accessToken: string;
  refreshToken: string;
  
}





