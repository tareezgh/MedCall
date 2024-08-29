import { Router } from "express";
import { RequestController } from "../controllers/requestController";

const router = Router();

router.post("/", RequestController.postRequest);
router.get("/", RequestController.getAllRequests);
router.get("/:id", RequestController.getRequestByUserId);
router.post("/active-request", RequestController.getActiveRequest);
router.patch("/:id", RequestController.updateRequest);

export default router;
