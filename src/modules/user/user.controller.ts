import { Request, Response } from "express";
import { userService } from "./user.service";

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUsers();

    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
    }

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve users",
    });
  }
};

export const userController = {
  getUsers,
};
