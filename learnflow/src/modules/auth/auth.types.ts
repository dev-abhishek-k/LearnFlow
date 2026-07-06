import { User } from "@/generated/prisma/client";
export interface RegisterInput {
  name: string;
  email: string;
  Password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}





