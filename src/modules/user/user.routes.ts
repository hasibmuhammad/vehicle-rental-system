import { Router } from "express";
import auth from "../../middleware/auth";
import authorizeOwnerOrAdmin from "../../middleware/authorizeOwnerOrAdmin";
import validate from "../../middleware/validate";
import { userController } from "./user.controller";
import { userUpdateSchema } from "./user.validation";

const router = Router();

// Create User
router.get("/", auth("admin"), userController.getUsers);

// Update User
router.put(
  "/:userId",
  auth(),
  authorizeOwnerOrAdmin((req) => Number(req.params.userId)),
  validate(userUpdateSchema),
  userController.updateUser,
);

// Delete user
router.delete("/:userId", auth("admin"), userController.deleteUser);

export const userRoutes = router;
