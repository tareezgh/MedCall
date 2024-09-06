import { Router } from "express";
import { RequestController } from "../controllers/requestController";

const router = Router();

router.post("/", RequestController.postRequest);
router.get("/", RequestController.getAllRequests);
router.get("/:id", RequestController.getRequestByUserId);
router.post("/active-request", RequestController.getActiveRequest);
router.post("/guest-request", RequestController.getGuestRequest);
router.patch("/:id", RequestController.updateRequest);

export default router;
