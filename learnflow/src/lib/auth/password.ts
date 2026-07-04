
import bcrypt from "bcryptjs";
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS as string));
}
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);    
}