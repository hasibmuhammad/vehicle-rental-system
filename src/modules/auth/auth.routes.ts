import { Router } from "express";
import validate from "../../middleware/validate";
import { authController } from "./auth.controller";
import { signupSchema } from "./auth.validation";

const router = Router();

router.post("/signup", validate(signupSchema), authController.signup);

export const authRoutes = router;
