import { Router } from "express";
import { UsersController } from "../controllers/usersController";

const router = Router();

router.post("/login", UsersController.login);
router.post("/register", UsersController.register);
router.post("/request-otp", UsersController.requestOtp);
router.post("/verify-otp", UsersController.verifyOtp);
router.post("/reset-password", UsersController.resetPassword);

export default router;
