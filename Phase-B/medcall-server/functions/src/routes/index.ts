const express = require("express");
import usersRoutes from "./users.routes";
import requestRoutes from "./request.routes";

const router = express.Router();

router.use("/api/users/", usersRoutes);
router.use("/api/request/", requestRoutes);

export default router;
