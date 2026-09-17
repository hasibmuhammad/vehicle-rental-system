import { Request, Response } from "express";
import { authService } from "./auth.service";

const signup = async (req: Request, res: Response) => {
  try {
    const result = await authService.signup(req.body);

    if (result.rows.length) {
      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: result.rows[0],
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to register",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const authController = {
  signup,
};
