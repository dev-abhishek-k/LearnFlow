
import bcrypt from "bcryptjs";
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS ?? 10);
export async function hashPassword(Password: string): Promise<string> {
  return bcrypt.hash(Password, SALT_ROUNDS);
}
export async function comparePassword(Password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(Password, hashedPassword);    
}