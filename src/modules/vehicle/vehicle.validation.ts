import z from "zod";

export const createVehicleSchema = z.object({
  vehicle_name: z.string().min(1, "Vehicle name is required"),
  type: z.enum(["car", "bike", "van", "SUV"]),
  registration_number: z.string().min(1, "Registration number is required"),
  daily_rent_price: z.number().positive(),
  availability_status: z.enum(["available", "booked"]).default("available"),
});

export const updateVehicleSchema = z.object({
  vehicle_name: z.string().optional(),
  type: z.enum(["car", "bike", "van", "SUV"]),
  registration_number: z.string().optional(),
  daily_rent_price: z.number().positive().optional(),
  availability_status: z.enum(["available", "booked"]).optional(),
});
