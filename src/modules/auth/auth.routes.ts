import { Router } from "express";
import validate from "../../middleware/validate";
import { authController } from "./auth.controller";
import { signinSchema, signupSchema } from "./auth.validation";

const router = Router();

router.post("/signup", validate(signupSchema), authController.signup);
router.post("/signin", validate(signinSchema), authController.signin);

export const authRoutes = router;
