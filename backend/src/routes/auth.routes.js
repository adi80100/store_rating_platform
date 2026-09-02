import express from "express";
import { changePassword, loginUser, registerUser } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login",loginUser)
router.put("/change-password", verifyJWT, changePassword);

export default router;