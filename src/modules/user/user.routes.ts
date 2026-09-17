import { Router } from "express";
import auth from "../../middleware/auth";
import { userController } from "./user.controller";

const router = Router();

router.get("/", auth("admin"), userController.getUsers);

export const userRoutes = router;
