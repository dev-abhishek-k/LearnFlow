import zod from "zod";

export const registerSchema = zod.object({
    name: zod.string().min(3).max(50),
    email: zod.string().email("Invalid email address").toLowerCase(),
    password: zod.string().min(6, "Password must be at least 6 characters long").max(16)
});

export const loginSchema = zod.object({
    email: zod.string().email("Invalid email address").toLowerCase(),
    password: zod.string().min(6, "Password must be at least 6 characters long").max(16)
});

export type RegisterInput = zod.infer<typeof registerSchema>;
export type LoginInput = zod.infer<typeof loginSchema>;