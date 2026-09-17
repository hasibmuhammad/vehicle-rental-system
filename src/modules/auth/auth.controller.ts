import { Request, Response } from "express";
import jwt from "jsonwebtoken";
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

const signin = async (req: Request, res: Response) => {
  try {
    const result = await authService.signin(req.body);

    return res.status(200).json({
      success: true,
      message: "Login successfull",
      data: result,
    });
  } catch (error: unknown) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: "Token Expired",
      });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};

export const authController = {
  signup,
  signin,
};
