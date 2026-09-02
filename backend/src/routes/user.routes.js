import express from "express";
import {getAllStores, submitRating, updateRating} from "../controllers/user.controller.js";

import { verifyJWT } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.use(verifyJWT);


router.get("/stores",verifyJWT,authorizeRoles("user"), getAllStores);

router.post("/rating", verifyJWT,authorizeRoles("user"),submitRating);

router.put("/rating", verifyJWT,authorizeRoles("user"), updateRating);

export default router;