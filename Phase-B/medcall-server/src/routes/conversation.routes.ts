import { Router } from "express";
import { ConversationController } from "../controllers/conversationsController";

const router = Router();

router.post("/", ConversationController.createConversation);
router.get("/:userId", ConversationController.getConversation);
router.get("/messages/:conversationId", ConversationController.getMessages);

export default router;
