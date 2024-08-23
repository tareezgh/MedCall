import { Router } from "express";
import { UsersController } from "../controllers/usersController";

const router = Router();

// Authentication and registration routes
router.post("/login", UsersController.login);
router.post("/register", UsersController.register);

// User profile management routes
router.patch("/:id", UsersController.editProfile);
router.patch("/drivers/:id", UsersController.editDriverData);
router.delete("/drivers/:id", UsersController.deleteDriver);

// OTP and password management routes
router.post("/otp/request", UsersController.requestOtp);
router.post("/otp/verify", UsersController.verifyOtp);
router.post("/password/reset", UsersController.resetPassword);

// Driver management routes
router.get("/drivers", UsersController.getDrivers);
router.post("/drivers/pending", UsersController.getPendingDrivers);

export default router;
