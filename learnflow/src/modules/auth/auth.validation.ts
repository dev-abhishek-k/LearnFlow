import {z} from "zod";  

export const registerSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters").max(50,"Name must be at most 50 characters"   ),
    email: z.string().email("Invalid email address").toLowerCase(),
    password: z.string().min(6, "Password must be at least 6 characters long").max(16,"Password must be at most 16 characters long")            
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email address").toLowerCase(),
    password: z.string().min(6, "Password must be at least 6 characters long").max(16,"Password must be at most 16 characters long")            
});

    export type RegisterInput = z.infer<typeof registerSchema>;
    export type LoginInput = z.infer<typeof loginSchema>;