import { Router } from "express";
import auth from "../../middleware/auth";
import authorizeOwnerOrAdmin from "../../middleware/authorizeOwnerOrAdmin";
import validate from "../../middleware/validate";
import { userController } from "./user.controller";
import { userUpdateSchema } from "./user.validation";

const router = Router();

router.get("/", auth("admin"), userController.getUsers);
router.put(
  "/:userId",
  auth(),
  authorizeOwnerOrAdmin((req) => Number(req.params.userId)),
  validate(userUpdateSchema),
  userController.updateUser,
);

export const userRoutes = router;
