import express from "express";
import { ownerDashboard } from "../controllers/owner.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.get(
  "/dashboard",
  verifyJWT,
  authorizeRoles("owner"),
  ownerDashboard
);

export default router;