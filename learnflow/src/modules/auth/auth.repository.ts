import {prisma} from "@/lib/prisma";
import type {Prisma,User} from "@/generated/prisma/client";
export class AuthRepository {
    async findUserByEmail(email: string): Promise<User | null>  {
        return await prisma.user.findUnique({
            where: {
                email
            }
        });
    }
    async createUser(data:Prisma.UserCreateInput): Promise<User> {
        return await prisma.user.create({
            data
        });
    }
    async findUserById(id: string): Promise<User | null> {
        return await prisma.user.findUnique({
            where: {
                id
            }
        });
    }
    async updateRefreshToken(userId: string, hashedRefreshToken: string): Promise<User> {
        return await prisma.user.update({
            where: { id: userId },
            data: { refreshToken: hashedRefreshToken },
        });
}
}            
export const authRepository = new AuthRepository();