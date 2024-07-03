import { Router } from "express";
import { RequestController } from "../controllers/requestController";

const router = Router();

router.post("/", RequestController.postRequest);

export default router;
