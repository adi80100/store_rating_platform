import express from "express";
import {getAllStores, submitRating, updateRating} from "../controllers/user.controller.js";

import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.use(verifyJWT);


router.get("/stores",authorizeRoles("user"), getAllStores);

router.post("/rating",authorizeRoles("user"),submitRating);

router.put("/rating",authorizeRoles("user"), updateRating);

export default router;