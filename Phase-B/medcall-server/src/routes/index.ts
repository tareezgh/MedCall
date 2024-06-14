const express = require("express");
import usersRoutes from "./users.routes";

const router = express.Router();

router.use("/api/users/", usersRoutes);

export default router;
