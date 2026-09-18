import z from "zod";

export const userUpdateSchema = z.object({
  name: z.string().optional(),
  email: z.email("Invalid email address").toLowerCase().optional(),
  phone: z.string().optional(),
  role: z.enum(["admin", "customer"]).optional(),
});
