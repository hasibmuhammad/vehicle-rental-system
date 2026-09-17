import z from "zod";

export const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address").toLowerCase(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  role: z.enum(["admin", "customer"]).default("customer"),
});

export const signinSchema = z.object({
  email: z.email("Invalid email address").toLowerCase(),
  password: z.string().min(1, "Password is required"),
});
