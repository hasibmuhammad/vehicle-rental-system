import express, { Request, Response } from "express";
import initDB from "./config/db";

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

// Not found route
app.use((_req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
