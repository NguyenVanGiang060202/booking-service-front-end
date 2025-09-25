import { z } from "zod";

export const loginSchema = z.object({
    username: z.string().min(5, "Username is required"),
    password: z.string().min(5, "Password is required"),
    rememberMe: z.boolean().default(false),
});