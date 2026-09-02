import express from "express";

import { addUser,addStore, getDashboard, getAllUsers, getAllStores, getUserDetails} from "../controllers/admin.controller.js";

import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.use(verifyJWT);
router.use(authorizeRoles("admin"));

router.post("/add-user", addUser);
router.post("/add-store", addStore);
router.get("/dashboard", getDashboard);
router.get("/users", getAllUsers);
router.get("/stores", getAllStores);
router.get("/user/:id", getUserDetails);

export default router;