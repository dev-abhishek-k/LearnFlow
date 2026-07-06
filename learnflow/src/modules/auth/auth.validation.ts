import {z} from "zod";  

export const registerSchema = z.object({
    name: z.string().min(3).max(50),
    email: z.string().email("Invalid email address").toLowerCase(),
    password: z.string().min(6, "Password must be at least 6 characters long").max(16)            
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email address").toLowerCase(),
    password: z.string().min(6, "Password must be at least 6 characters long").max(16)            
});

    export type RegisterInput = z.infer<typeof registerSchema>;
    export type LoginInput = z.infer<typeof loginSchema>;