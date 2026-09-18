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

const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, role } = req.body;
    const { userId } = req.params;
    const requester = req.user!;

    const payload = {
      name,
      email,
      phone,
      role,
      userId,
    };

    if (
      requester.role !== "admin" &&
      payload.role &&
      Number(userId) === requester.id
    ) {
      return res.status(400).json({
        success: false,
        message: "Bad Request",
      });
    }

    if (
      requester.role === "admin" &&
      payload.role &&
      Number(userId) === requester.id
    ) {
      return res.status(400).json({
        success: false,
        message: "Bad Request",
      });
    }

    const result = await userService.updateUser({ ...payload, userId });

    if (result.rowCount) {
      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: result.rows[0],
      });
    }

    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
    }
    return res.status(500).json({
      success: false,
      message: "Failed to update",
    });
  }
};

export const userController = {
  getUsers,
  updateUser,
};
