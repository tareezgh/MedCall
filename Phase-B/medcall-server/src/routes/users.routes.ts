import { Router } from "express";
import { UsersController } from "../controllers/usersController";

const router = Router();

router.post("/login", UsersController.login);
router.post("/register", UsersController.register);
router.patch("/edit/:id", UsersController.editProfile);
router.post("/request-otp", UsersController.requestOtp);
router.post("/verify-otp", UsersController.verifyOtp);
router.post("/reset-password", UsersController.resetPassword);
router.get("/get-drivers", UsersController.getDrivers);
router.post("/get-drivers", UsersController.getPendingDrivers);

export default router;
