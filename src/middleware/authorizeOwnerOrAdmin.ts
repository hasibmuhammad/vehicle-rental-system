import { NextFunction, Request, Response } from "express";

const authorizeOwnerOrAdmin = (getUserId: (req: Request) => Number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const targetUserId = getUserId(req);
    const requesterUser = req.user!;

    if (requesterUser.role !== "admin" && targetUserId !== requesterUser.id) {
      return res.status(403).json({
        success: false,
        message: "Forbidden! You can update our own profile",
      });
    }

    next();
  };
};

export default authorizeOwnerOrAdmin;
