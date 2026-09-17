import express, { Request, Response } from "express";
import initDB from "./config/db";
import { authRoutes } from "./modules/auth/auth.routes";
import { userRoutes } from "./modules/user/user.routes";

const app = express();

// middleware
app.use(express.json());

// init DB
initDB();

// Root route
app.get("/", (_req: Request, res: Response) => {
  return res
    .status(200)
    .json({ success: true, message: "Welcome to vechicle rental system" });
});

// use routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);

// Not found route
app.use((_req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
