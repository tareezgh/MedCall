const express = require("express");
import usersRoutes from "./users.routes";
import requestRoutes from "./request.routes";
import conversationRoutes from "./conversation.routes";

const router = express.Router();

router.use("/api/users/", usersRoutes);
router.use("/api/request/", requestRoutes);
router.use("/api/conversation/", conversationRoutes);

export default router;
